// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageUnwrapper {
    bool public boolean;
    uint public unsignedInteger;
    uint[3] public fixedArray;
    uint[] public dynamicArray;
    string private String = "smsmsmsmsmsmsmsmsmsms1234fdsjfd";
    bytes private Bytes = "smsmsmsmsmsmsmsmsmsms1234fdsjfd";
    struct Struct {
        uint256 id;
        uint256 value;
        string s;
    }
    mapping(address => uint) map;
    Struct sms;

    function setMapping() public {
        map[msg.sender] = 7;
    }

    function getMapping() public view returns (uint) {
        return map[msg.sender];
    }

    function getDynArray(uint _location) public pure returns (bytes32) {
        return keccak256(abi.encode(bytes32(_location)));
    }

    function setStruct() public {
        sms = Struct(7, 9, "solidity");
    }

    function setBoolean(bool _bool) public {
        boolean = _bool;
    }

    function getDynamicArray(uint _uint) public view returns (uint) {
        return dynamicArray[_uint];
    }

    function setUnsignedInteger(uint _uint) public {
        unsignedInteger = _uint;
    }

    function setFixedArray(uint8 index, uint _uint) public {
        fixedArray[index] = _uint;
    }

    function setDynamicArray(uint _uint) public {
        dynamicArray.push(_uint);
    }
}
