// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.10;

contract GuessTheNumberChallenge2 {
    bool public isSolved;

    event LogUint(uint256 indexed, uint256 indexed);

    function guess(uint256 a) public {
        uint256 result = addmod(a, a++, 10);
        if (result == 7) {
            isSolved = true;
        }
        emit LogUint(a, a++);
    }
}
