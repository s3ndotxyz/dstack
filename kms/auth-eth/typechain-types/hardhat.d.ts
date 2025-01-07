/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AppAuth",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AppAuth__factory>;
    getContractFactory(
      name: "IAppAuth",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAppAuth__factory>;
    getContractFactory(
      name: "KmsAuth",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.KmsAuth__factory>;

    getContractAt(
      name: "AppAuth",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AppAuth>;
    getContractAt(
      name: "IAppAuth",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAppAuth>;
    getContractAt(
      name: "KmsAuth",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.KmsAuth>;

    deployContract(
      name: "AppAuth",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AppAuth>;
    deployContract(
      name: "IAppAuth",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAppAuth>;
    deployContract(
      name: "KmsAuth",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.KmsAuth>;

    deployContract(
      name: "AppAuth",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AppAuth>;
    deployContract(
      name: "IAppAuth",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAppAuth>;
    deployContract(
      name: "KmsAuth",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.KmsAuth>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
