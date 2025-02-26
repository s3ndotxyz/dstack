/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace IAppAuth {
  export type AppBootInfoStruct = {
    appId: AddressLike;
    composeHash: BytesLike;
    instanceId: AddressLike;
    deviceId: BytesLike;
    mrAggregated: BytesLike;
    mrImage: BytesLike;
  };

  export type AppBootInfoStructOutput = [
    appId: string,
    composeHash: string,
    instanceId: string,
    deviceId: string,
    mrAggregated: string,
    mrImage: string
  ] & {
    appId: string;
    composeHash: string;
    instanceId: string;
    deviceId: string;
    mrAggregated: string;
    mrImage: string;
  };
}

export interface IAppAuthInterface extends Interface {
  getFunction(nameOrSignature: "isAppAllowed"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "isAppAllowed",
    values: [IAppAuth.AppBootInfoStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "isAppAllowed",
    data: BytesLike
  ): Result;
}

export interface IAppAuth extends BaseContract {
  connect(runner?: ContractRunner | null): IAppAuth;
  waitForDeployment(): Promise<this>;

  interface: IAppAuthInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  isAppAllowed: TypedContractMethod<
    [bootInfo: IAppAuth.AppBootInfoStruct],
    [[boolean, string] & { isAllowed: boolean; reason: string }],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "isAppAllowed"
  ): TypedContractMethod<
    [bootInfo: IAppAuth.AppBootInfoStruct],
    [[boolean, string] & { isAllowed: boolean; reason: string }],
    "view"
  >;

  filters: {};
}
