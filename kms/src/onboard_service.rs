use std::path::Path;

use anyhow::{Context, Result};
use fs_err as fs;
use k256::ecdsa::SigningKey;
use kms_rpc::{
    kms_client::KmsClient,
    onboard_server::{OnboardRpc, OnboardServer},
    BootstrapRequest, BootstrapResponse, OnboardRequest, OnboardResponse,
};
use ra_rpc::{client::RaClient, CallContext, RpcCall};
use ra_tls::{
    attestation::QuoteContentType,
    cert::{CaCert, CertRequest},
    rcgen::{Certificate, KeyPair, PKCS_ECDSA_P256_SHA256},
};
use tappd_rpc::{RawQuoteArgs, TdxQuoteResponse};

use crate::config::KmsConfig;

#[derive(Clone)]
pub struct OnboardState {
    config: KmsConfig,
}

impl OnboardState {
    pub fn new(config: KmsConfig) -> Self {
        Self { config }
    }
}

pub struct OnboardHandler {
    state: OnboardState,
}

impl RpcCall<OnboardState> for OnboardHandler {
    type PrpcService = OnboardServer<Self>;

    fn construct(context: CallContext<'_, OnboardState>) -> Result<Self> {
        Ok(OnboardHandler {
            state: context.state.clone(),
        })
    }
}

impl OnboardRpc for OnboardHandler {
    async fn bootstrap(self, request: BootstrapRequest) -> Result<BootstrapResponse> {
        let keys = Keys::generate(&request.domain).context("Failed to generate keys")?;

        let k256_pubkey = keys.k256_key.verifying_key().to_sec1_bytes().to_vec();
        let ca_pubkey = keys.ca_key.public_key_der();
        let quote = if self.state.config.onboard.quote_enabled {
            quote_keys(&hex::encode(&ca_pubkey), &hex::encode(&k256_pubkey)).await?
        } else {
            vec![]
        };

        keys.store(&self.state.config)?;

        Ok(BootstrapResponse {
            ca_pubkey,
            k256_pubkey,
            quote,
        })
    }

    async fn onboard(self, request: OnboardRequest) -> Result<OnboardResponse> {
        let keys = Keys::onboard(
            &request.source_url,
            &request.domain,
            self.state.config.onboard.quote_enabled,
        )
        .await
        .context("Failed to onboard")?;
        keys.store(&self.state.config)
            .context("Failed to store keys")?;
        Ok(OnboardResponse {})
    }

    async fn finish(self) -> anyhow::Result<()> {
        std::process::exit(0);
    }
}

struct Keys {
    k256_key: SigningKey,
    tmp_ca_key: KeyPair,
    tmp_ca_cert: Certificate,
    ca_key: KeyPair,
    ca_cert: Certificate,
    rpc_key: KeyPair,
    rpc_cert: Certificate,
}

impl Keys {
    fn generate(domain: &str) -> Result<Self> {
        let tmp_ca_key = KeyPair::generate_for(&PKCS_ECDSA_P256_SHA256)?;
        let ca_key = KeyPair::generate_for(&PKCS_ECDSA_P256_SHA256)?;
        let rpc_key = KeyPair::generate_for(&PKCS_ECDSA_P256_SHA256)?;
        let k256_key = SigningKey::random(&mut rand::rngs::OsRng);
        Self::from_keys(tmp_ca_key, ca_key, rpc_key, k256_key, domain)
    }

    fn from_keys(
        tmp_ca_key: KeyPair,
        ca_key: KeyPair,
        rpc_key: KeyPair,
        k256_key: SigningKey,
        domain: &str,
    ) -> Result<Self> {
        let tmp_ca_cert = CertRequest::builder()
            .org_name("Dstack")
            .subject("Dstack Client Temp CA")
            .ca_level(1)
            .key(&tmp_ca_key)
            .build()
            .self_signed()?;

        // Create self-signed KMS cert
        let ca_cert = CertRequest::builder()
            .org_name("Dstack")
            .subject("Dstack KMS CA")
            .ca_level(3)
            .key(&ca_key)
            .build()
            .self_signed()?;

        // Sign WWW server cert with KMS cert
        let rpc_cert = CertRequest::builder()
            .subject(domain)
            .alt_names(&[domain.to_string()])
            .key(&rpc_key)
            .build()
            .signed_by(&ca_cert, &ca_key)?;
        Ok(Keys {
            k256_key,
            tmp_ca_key,
            tmp_ca_cert,
            ca_key,
            ca_cert,
            rpc_key,
            rpc_cert,
        })
    }

    async fn onboard(other_kms_url: &str, domain: &str, quote_enabled: bool) -> Result<Self> {
        let kms_client = RaClient::new(other_kms_url.into(), true);
        let mut kms_client = KmsClient::new(kms_client);

        if quote_enabled {
            let tmp_ca = kms_client.get_temp_ca_cert().await?;
            let (ra_cert, ra_key) = gen_ra_cert(tmp_ca.temp_ca_cert, tmp_ca.temp_ca_key).await?;
            let ra_client = RaClient::new_mtls(other_kms_url.into(), ra_cert, ra_key)?;
            kms_client = KmsClient::new(ra_client);
        }

        let keys_res = kms_client.get_kms_key().await?;
        if keys_res.keys.len() != 1 {
            return Err(anyhow::anyhow!("Invalid keys"));
        }
        let keys = keys_res.keys[0].clone();
        let tmp_ca_key_pem = keys_res.tmp_ca_key;
        let root_ca_key_pem = keys.ca_key;
        let root_k256_key = keys.k256_key;

        let rpc_key = KeyPair::generate_for(&PKCS_ECDSA_P256_SHA256)?;
        let ca_key = KeyPair::from_pem(&root_ca_key_pem).context("Failed to parse CA key")?;
        let tmp_ca_key =
            KeyPair::from_pem(&tmp_ca_key_pem).context("Failed to parse tmp CA key")?;
        let ecdsa_key =
            SigningKey::from_slice(&root_k256_key).context("Failed to parse ECDSA key")?;
        Self::from_keys(tmp_ca_key, ca_key, rpc_key, ecdsa_key, domain)
    }

    fn store(&self, cfg: &KmsConfig) -> Result<()> {
        // Store the temporary CA cert and key
        fs_write(&cfg.tmp_ca_cert, self.tmp_ca_cert.pem())?;
        fs_write(&cfg.tmp_ca_key, self.tmp_ca_key.serialize_pem())?;

        // Store the root CA cert and key
        fs_write(&cfg.root_ca_cert, self.ca_cert.pem())?;
        fs_write(&cfg.root_ca_key, self.ca_key.serialize_pem())?;

        // Store the RPC cert and key
        fs_write(&cfg.rpc_cert, self.rpc_cert.pem())?;
        fs_write(&cfg.rpc_key, self.rpc_key.serialize_pem())?;

        // Store the ECDSA root key
        fs_write(&cfg.k256_key, self.k256_key.to_bytes())?;

        Ok(())
    }
}

fn fs_write(path: impl AsRef<Path>, content: impl AsRef<[u8]>) -> Result<()> {
    if let Some(parent) = path.as_ref().parent() {
        fs::create_dir_all(parent)?;
    }
    fs::write(path, content)?;
    Ok(())
}

async fn tapp_quote(report_data: Vec<u8>) -> Result<TdxQuoteResponse> {
    let http_client = http_client::prpc::PrpcClient::new("unix:/var/run/tappd.sock".into());
    let tappd_client = tappd_rpc::tappd_client::TappdClient::new(http_client);
    let quote = tappd_client.raw_quote(RawQuoteArgs { report_data }).await?;
    Ok(quote)
}

async fn quote_keys(p256_pubkey: &str, k256_pubkey: &str) -> Result<Vec<u8>> {
    let content_to_quote = format!("dstack-kms-genereted-keys-v1:{p256_pubkey}\n{k256_pubkey}\n");
    let hash = keccak256(content_to_quote.as_bytes());
    let report_data = pad64(hash);
    let res = tapp_quote(report_data).await?;
    Ok(res.quote)
}

fn keccak256(msg: &[u8]) -> [u8; 32] {
    use sha3::{Digest, Keccak256};
    let mut hasher = Keccak256::new();
    hasher.update(msg);
    hasher.finalize().into()
}

fn pad64(hash: [u8; 32]) -> Vec<u8> {
    let mut padded = Vec::with_capacity(64);
    padded.extend_from_slice(&hash);
    padded.resize(64, 0);
    padded
}

async fn gen_ra_cert(ca_cert_pem: String, ca_key_pem: String) -> Result<(String, String)> {
    use ra_tls::cert::CertRequest;
    use ra_tls::rcgen::{KeyPair, PKCS_ECDSA_P256_SHA256};

    let ca = CaCert::new(ca_cert_pem, ca_key_pem)?;

    let key = KeyPair::generate_for(&PKCS_ECDSA_P256_SHA256)?;
    let pubkey = key.public_key_der();
    let report_data = QuoteContentType::RaTlsCert.to_report_data(&pubkey);
    let quote_res = tapp_quote(report_data.to_vec())
        .await
        .context("Failed to get quote")?;
    let quote = quote_res.quote;
    let event_log: Vec<u8> = quote_res.event_log.into();
    let req = CertRequest::builder()
        .subject("RA-TLS TEMP Cert")
        .quote(&quote)
        .event_log(&event_log)
        .key(&key)
        .build();
    let cert = ca.sign(req).context("Failed to sign certificate")?;
    Ok((cert.pem(), key.serialize_pem()))
}
