// SPDX-License-Identifier:GPL-3.0-or-later
pragma solidity 0.7.6;

/// @notice Challenge Description
/// Make `isSolved` true
contract WeirdVaultChallenge {
    bool public isSolved;

    function complete() external {
        require(address(this).balance != 0, "balance zero");
        payable(msg.sender).transfer(address(this).balance);

        isSolved = true;
    }
}
