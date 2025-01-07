/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace IAppAuth {
  export type AppBootInfoStruct = {
    appId: AddressLike;
    composeHash: BytesLike;
    instanceId: AddressLike;
    deviceId: BytesLike;
    mrEnclave: BytesLike;
    mrImage: BytesLike;
  };

  export type AppBootInfoStructOutput = [
    appId: string,
    composeHash: string,
    instanceId: string,
    deviceId: string,
    mrEnclave: string,
    mrImage: string
  ] & {
    appId: string;
    composeHash: string;
    instanceId: string;
    deviceId: string;
    mrEnclave: string;
    mrImage: string;
  };
}

export interface KmsAuthInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "allowedEnclaves"
      | "allowedImages"
      | "appController"
      | "apps"
      | "deregisterEnclave"
      | "deregisterImage"
      | "isAppAllowed"
      | "kmsAppId"
      | "kmsInfo"
      | "owner"
      | "registerApp"
      | "registerEnclave"
      | "registerImage"
      | "setKmsInfo"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AppRegistered"
      | "EnclaveDeregistered"
      | "EnclaveRegistered"
      | "ImageDeregistered"
      | "ImageRegistered"
      | "KmsInfoSet"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "allowedEnclaves",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "allowedImages",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "appController",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "apps", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "deregisterEnclave",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deregisterImage",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isAppAllowed",
    values: [IAppAuth.AppBootInfoStruct]
  ): string;
  encodeFunctionData(functionFragment: "kmsAppId", values?: undefined): string;
  encodeFunctionData(functionFragment: "kmsInfo", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerApp",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerEnclave",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerImage",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setKmsInfo",
    values: [AddressLike, BytesLike, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "allowedEnclaves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allowedImages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "appController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "apps", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deregisterEnclave",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deregisterImage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAppAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "kmsAppId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "kmsInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerApp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerEnclave",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerImage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setKmsInfo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace AppRegisteredEvent {
  export type InputTuple = [appId: AddressLike];
  export type OutputTuple = [appId: string];
  export interface OutputObject {
    appId: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EnclaveDeregisteredEvent {
  export type InputTuple = [mrEnclave: BytesLike];
  export type OutputTuple = [mrEnclave: string];
  export interface OutputObject {
    mrEnclave: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EnclaveRegisteredEvent {
  export type InputTuple = [mrEnclave: BytesLike];
  export type OutputTuple = [mrEnclave: string];
  export interface OutputObject {
    mrEnclave: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ImageDeregisteredEvent {
  export type InputTuple = [mrImage: BytesLike];
  export type OutputTuple = [mrImage: string];
  export interface OutputObject {
    mrImage: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ImageRegisteredEvent {
  export type InputTuple = [mrImage: BytesLike];
  export type OutputTuple = [mrImage: string];
  export interface OutputObject {
    mrImage: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace KmsInfoSetEvent {
  export type InputTuple = [appId: AddressLike, publicKey: BytesLike];
  export type OutputTuple = [appId: string, publicKey: string];
  export interface OutputObject {
    appId: string;
    publicKey: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface KmsAuth extends BaseContract {
  connect(runner?: ContractRunner | null): KmsAuth;
  waitForDeployment(): Promise<this>;

  interface: KmsAuthInterface;

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

  allowedEnclaves: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  allowedImages: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  appController: TypedContractMethod<[appId: AddressLike], [string], "view">;

  apps: TypedContractMethod<
    [arg0: AddressLike],
    [[boolean, string] & { isRegistered: boolean; controller: string }],
    "view"
  >;

  deregisterEnclave: TypedContractMethod<
    [mrEnclave: BytesLike],
    [void],
    "nonpayable"
  >;

  deregisterImage: TypedContractMethod<
    [mrImage: BytesLike],
    [void],
    "nonpayable"
  >;

  isAppAllowed: TypedContractMethod<
    [bootInfo: IAppAuth.AppBootInfoStruct],
    [[boolean, string] & { isAllowed: boolean; reason: string }],
    "view"
  >;

  kmsAppId: TypedContractMethod<[], [string], "view">;

  kmsInfo: TypedContractMethod<
    [],
    [
      [string, string, string, string] & {
        appId: string;
        publicKey: string;
        rootCa: string;
        raReport: string;
      }
    ],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  registerApp: TypedContractMethod<
    [salt: BytesLike, controller: AddressLike],
    [void],
    "nonpayable"
  >;

  registerEnclave: TypedContractMethod<
    [mrEnclave: BytesLike],
    [void],
    "nonpayable"
  >;

  registerImage: TypedContractMethod<
    [mrImage: BytesLike],
    [void],
    "nonpayable"
  >;

  setKmsInfo: TypedContractMethod<
    [
      appId: AddressLike,
      publicKey: BytesLike,
      rootCa: string,
      raReport: string
    ],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "allowedEnclaves"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "allowedImages"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "appController"
  ): TypedContractMethod<[appId: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "apps"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [[boolean, string] & { isRegistered: boolean; controller: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "deregisterEnclave"
  ): TypedContractMethod<[mrEnclave: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deregisterImage"
  ): TypedContractMethod<[mrImage: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "isAppAllowed"
  ): TypedContractMethod<
    [bootInfo: IAppAuth.AppBootInfoStruct],
    [[boolean, string] & { isAllowed: boolean; reason: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "kmsAppId"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "kmsInfo"
  ): TypedContractMethod<
    [],
    [
      [string, string, string, string] & {
        appId: string;
        publicKey: string;
        rootCa: string;
        raReport: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "registerApp"
  ): TypedContractMethod<
    [salt: BytesLike, controller: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "registerEnclave"
  ): TypedContractMethod<[mrEnclave: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "registerImage"
  ): TypedContractMethod<[mrImage: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setKmsInfo"
  ): TypedContractMethod<
    [
      appId: AddressLike,
      publicKey: BytesLike,
      rootCa: string,
      raReport: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "AppRegistered"
  ): TypedContractEvent<
    AppRegisteredEvent.InputTuple,
    AppRegisteredEvent.OutputTuple,
    AppRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "EnclaveDeregistered"
  ): TypedContractEvent<
    EnclaveDeregisteredEvent.InputTuple,
    EnclaveDeregisteredEvent.OutputTuple,
    EnclaveDeregisteredEvent.OutputObject
  >;
  getEvent(
    key: "EnclaveRegistered"
  ): TypedContractEvent<
    EnclaveRegisteredEvent.InputTuple,
    EnclaveRegisteredEvent.OutputTuple,
    EnclaveRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "ImageDeregistered"
  ): TypedContractEvent<
    ImageDeregisteredEvent.InputTuple,
    ImageDeregisteredEvent.OutputTuple,
    ImageDeregisteredEvent.OutputObject
  >;
  getEvent(
    key: "ImageRegistered"
  ): TypedContractEvent<
    ImageRegisteredEvent.InputTuple,
    ImageRegisteredEvent.OutputTuple,
    ImageRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "KmsInfoSet"
  ): TypedContractEvent<
    KmsInfoSetEvent.InputTuple,
    KmsInfoSetEvent.OutputTuple,
    KmsInfoSetEvent.OutputObject
  >;

  filters: {
    "AppRegistered(address)": TypedContractEvent<
      AppRegisteredEvent.InputTuple,
      AppRegisteredEvent.OutputTuple,
      AppRegisteredEvent.OutputObject
    >;
    AppRegistered: TypedContractEvent<
      AppRegisteredEvent.InputTuple,
      AppRegisteredEvent.OutputTuple,
      AppRegisteredEvent.OutputObject
    >;

    "EnclaveDeregistered(bytes32)": TypedContractEvent<
      EnclaveDeregisteredEvent.InputTuple,
      EnclaveDeregisteredEvent.OutputTuple,
      EnclaveDeregisteredEvent.OutputObject
    >;
    EnclaveDeregistered: TypedContractEvent<
      EnclaveDeregisteredEvent.InputTuple,
      EnclaveDeregisteredEvent.OutputTuple,
      EnclaveDeregisteredEvent.OutputObject
    >;

    "EnclaveRegistered(bytes32)": TypedContractEvent<
      EnclaveRegisteredEvent.InputTuple,
      EnclaveRegisteredEvent.OutputTuple,
      EnclaveRegisteredEvent.OutputObject
    >;
    EnclaveRegistered: TypedContractEvent<
      EnclaveRegisteredEvent.InputTuple,
      EnclaveRegisteredEvent.OutputTuple,
      EnclaveRegisteredEvent.OutputObject
    >;

    "ImageDeregistered(bytes32)": TypedContractEvent<
      ImageDeregisteredEvent.InputTuple,
      ImageDeregisteredEvent.OutputTuple,
      ImageDeregisteredEvent.OutputObject
    >;
    ImageDeregistered: TypedContractEvent<
      ImageDeregisteredEvent.InputTuple,
      ImageDeregisteredEvent.OutputTuple,
      ImageDeregisteredEvent.OutputObject
    >;

    "ImageRegistered(bytes32)": TypedContractEvent<
      ImageRegisteredEvent.InputTuple,
      ImageRegisteredEvent.OutputTuple,
      ImageRegisteredEvent.OutputObject
    >;
    ImageRegistered: TypedContractEvent<
      ImageRegisteredEvent.InputTuple,
      ImageRegisteredEvent.OutputTuple,
      ImageRegisteredEvent.OutputObject
    >;

    "KmsInfoSet(address,bytes32)": TypedContractEvent<
      KmsInfoSetEvent.InputTuple,
      KmsInfoSetEvent.OutputTuple,
      KmsInfoSetEvent.OutputObject
    >;
    KmsInfoSet: TypedContractEvent<
      KmsInfoSetEvent.InputTuple,
      KmsInfoSetEvent.OutputTuple,
      KmsInfoSetEvent.OutputObject
    >;
  };
}
