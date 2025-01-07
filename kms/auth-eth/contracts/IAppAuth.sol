// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAppAuth {
    struct AppBootInfo {
        address appId;
        bytes32 composeHash;
        address instanceId;
        bytes32 deviceId;
        bytes32 mrEnclave;
        bytes32 mrImage;
    }

    function isAppAllowed(AppBootInfo calldata bootInfo) external view returns (bool isAllowed, string memory reason);
}
