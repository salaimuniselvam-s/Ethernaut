// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external;
}

interface IForta {
    function setDetectionBot(address detectionBotAddress) external;

    function notify(address user, bytes calldata msgData) external;

    function raiseAlert(address user) external;
}

contract Forta is IForta {
    mapping(address => IDetectionBot) public usersDetectionBots;
    mapping(address => uint256) public botRaisedAlerts;

    function setDetectionBot(address detectionBotAddress) external override {
        require(
            address(usersDetectionBots[msg.sender]) == address(0),
            "DetectionBot already set"
        );
        usersDetectionBots[msg.sender] = IDetectionBot(detectionBotAddress);
    }

    function notify(address user, bytes calldata msgData) external override {
        if (address(usersDetectionBots[user]) == address(0)) return;
        try usersDetectionBots[user].handleTransaction(user, msgData) {
            return;
        } catch {}
    }

    function raiseAlert(address user) external override {
        if (address(usersDetectionBots[user]) != msg.sender) return;
        botRaisedAlerts[msg.sender] += 1;
    }
}

contract MyDetectionBot is IDetectionBot {
    address public cryptoVaultAddress;

    constructor(address _cryptoVaultAddress) {
        cryptoVaultAddress = _cryptoVaultAddress;
    }

    // we can comment out the variable name to silence "unused parameter" error
    function handleTransaction(
        address user,
        bytes calldata /* msgData */
    ) external override {
        // extract sender from calldata
        address origSender;
        assembly {
            origSender := calldataload(0xa8)
        }

        // raise alert only if the msg.sender is CryptoVault contract
        if (origSender == cryptoVaultAddress) {
            Forta(msg.sender).raiseAlert(user);
        }
    }
}
