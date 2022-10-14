// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract CutBytes32 {
    function cutBytes32(bytes32 source)
        public
        pure
        returns (bytes16 half1, bytes16 half2)
    {
        half1 = bytes16(source);
        half2 = bytes16(uint128(uint256(source)));
    }
}
// older way of doing it..
// pragma solidity ^0.4.8;

// contract c {
//     event trace(bytes32 x, bytes16 a, bytes16 b);

//     function foo(bytes32 source) {
//         bytes16[2] memory y = [bytes16(0), 0];
//         assembly {
//             mstore(y, source)
//             mstore(add(y, 16), source)
//         }
//         trace(source, y[0], y[1]);
//     }
// }
