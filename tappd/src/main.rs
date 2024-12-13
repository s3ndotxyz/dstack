use std::{fs::Permissions, future::pending, os::unix::fs::PermissionsExt};

use anyhow::{anyhow, Context, Result};
use clap::Parser;
use rocket::{
    fairing::AdHoc,
    figment::Figment,
    listener::{Bind, DefaultListener},
};
use rocket_vsock_listener::VsockListener;
use rpc_service::AppState;
use sd_notify::{notify as sd_notify, NotifyState};
use std::time::Duration;
use tracing::{error, info};

mod config;
mod guest_api_routes;
mod guest_api_service;
mod http_routes;
mod models;
mod rpc_service;

fn app_version() -> String {
    const CARGO_PKG_VERSION: &str = env!("CARGO_PKG_VERSION");
    const VERSION: &str = git_version::git_version!(
        args = ["--abbrev=20", "--always", "--dirty=-modified"],
        prefix = "git:",
        fallback = "unknown"
    );
    format!("v{CARGO_PKG_VERSION} ({VERSION})")
}

#[derive(Parser)]
#[command(author, version, about, long_version = app_version())]
struct Args {
    /// Path to the configuration file
    #[arg(short, long)]
    config: Option<String>,

    /// Enable systemd watchdog
    #[arg(short, long)]
    watchdog: bool,
}

async fn run_internal(state: AppState, figment: Figment) -> Result<()> {
    let rocket = rocket::custom(figment)
        .mount("/", http_routes::internal_routes())
        .manage(state);
    let ignite = rocket
        .ignite()
        .await
        .map_err(|err| anyhow!("Failed to ignite rocket: {err}"))?;
    let endpoint = DefaultListener::bind_endpoint(&ignite)
        .map_err(|err| anyhow!("Failed to get endpoint: {err}"))?;
    let listener = DefaultListener::bind(&ignite)
        .await
        .map_err(|err| anyhow!("Failed to bind on {endpoint}: {err}"))?;
    if let Some(path) = endpoint.unix() {
        // Allow any user to connect to the socket
        fs_err::set_permissions(path, Permissions::from_mode(0o777))?;
    }
    ignite
        .launch_on(listener)
        .await
        .map_err(|err| anyhow!(err.to_string()))?;
    Ok(())
}

async fn run_external(state: AppState, figment: Figment) -> Result<()> {
    let rocket = rocket::custom(figment)
        .mount("/", http_routes::external_routes(state.config()))
        .attach(AdHoc::on_response("Add app version header", |_req, res| {
            Box::pin(async move {
                res.set_raw_header("X-App-Version", app_version());
            })
        }))
        .manage(state);
    let _ = rocket
        .launch()
        .await
        .map_err(|err| anyhow!("Failed to ignite rocket: {err}"))?;
    Ok(())
}

async fn run_guest_api(state: AppState, figment: Figment) -> Result<()> {
    let rocket = rocket::custom(figment)
        .mount("/api", guest_api_routes::routes())
        .manage(state);

    let ignite = rocket
        .ignite()
        .await
        .map_err(|err| anyhow!("Failed to ignite rocket: {err}"))?;
    let listener = VsockListener::bind_rocket(&ignite)
        .map_err(|err| anyhow!("Failed to bind guest API : {err}"))?;
    ignite
        .launch_on(listener)
        .await
        .map_err(|err| anyhow!(err.to_string()))?;
    Ok(())
}

async fn run_watchdog() {
    let mut watchdog_usec = 0;
    let enabled = sd_notify::watchdog_enabled(false, &mut watchdog_usec);
    if !enabled {
        info!("Watchdog is not enabled in systemd service");
        return pending::<()>().await;
    }

    info!("Starting watchdog");
    // Notify systemd that we're ready
    if let Err(err) = sd_notify(false, &[NotifyState::Ready]) {
        error!("Failed to notify systemd: {err}");
    }
    let heatbeat_interval = Duration::from_micros(watchdog_usec / 2);
    let heatbeat_interval = heatbeat_interval.max(Duration::from_secs(1));
    info!("Watchdog enabled, interval={watchdog_usec}us, heartbeat={heatbeat_interval:?}",);
    let mut interval = tokio::time::interval(heatbeat_interval);

    // Create HTTP client for health checks
    let client = reqwest::Client::new();

    loop {
        interval.tick().await;

        // Perform health check
        match client
            .get("http://localhost:8090/prpc/Worker.Version")
            .send()
            .await
        {
            Ok(response) if response.status().is_success() => {
                // Only notify systemd if health check passes
                if let Err(err) = sd_notify(false, &[NotifyState::Watchdog]) {
                    error!("Failed to notify systemd: {err}");
                }
            }
            Ok(response) => {
                error!("Health check failed with status: {}", response.status());
            }
            Err(err) => {
                error!("Health check request failed: {}", err);
            }
        }
    }
}

#[rocket::main]
async fn main() -> Result<()> {
    {
        use tracing_subscriber::{fmt, EnvFilter};
        let filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info"));
        fmt().with_env_filter(filter).init();
    }
    let args = Args::parse();
    let figment = config::load_config_figment(args.config.as_deref());
    let state =
        AppState::new(figment.focus("core").extract()?).context("Failed to create app state")?;
    let internal_figment = figment.clone().select("internal");
    let external_figment = figment.clone().select("external");
    let external_https_figment = figment.clone().select("external-https");
    let guest_api_figment = figment.select("guest-api");
    tokio::select!(
        res = run_internal(state.clone(), internal_figment) => res?,
        res = run_external(state.clone(), external_figment) => res?,
        res = run_external(state.clone(), external_https_figment) => res?,
        res = run_guest_api(state.clone(), guest_api_figment) => res?,
        _ = async {
            if args.watchdog {
                run_watchdog().await;
            } else {
                pending::<()>().await;
            }
        } => {}
    );
    Ok(())
}
