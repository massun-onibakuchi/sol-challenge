// SPDX-License-Identifier:GPL-3.0-or-later
pragma solidity 0.7.6;

/// @notice Challenge Description
/// Guess two numbers which satisfy conditions.
contract GuessTheNumberChallenge {
    bool public isSolved;
    uint256 public MAX_UINT256 = uint256(-1);

    function input(uint256 a, uint256 b) external {
        if (a == (b + 1000) && b > a) {
            isSolved = true;
        }
    }

    function hint() external view returns (uint256) {
        return MAX_UINT256 + 1;
    }
}
