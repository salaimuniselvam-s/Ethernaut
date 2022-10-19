// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract MagicNumber {
    address public solver;

    constructor() public {}

    function setSolver(address _solver) public {
        solver = _solver;
    }

    /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}

// 602a    // v: push1 0x2a (value is 0x2a)
// 6000    // p: push1 0x00 (memory slot is 0x00)
// 52      // mstore
// 6020    // s: push1 0x20 (value is 32 bytes in size)
// 6000    // p: push1 0x00 (value was stored in slot 0x00)
// f3      // return

contract AttackMagicNumber {
    MagicNumber magic;
    event SolverAddress(address addr);

    constructor(address addr) public {
        magic = MagicNumber(addr);
    }

    function Attack() public {
        bytes
            memory bytecode = hex"600a600c600039600a6000f3602a60005260206000f3";
        bytes32 salt = 0;
        address solver;

        assembly {
            solver := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        }
        emit SolverAddress(solver);

        magic.setSolver(solver);
    }
}
