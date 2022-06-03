// SPDX-License-Identifier:GPL-3.0-or-later
pragma solidity 0.8.10;

/// @notice Challenge Description
/// This vault allows anyone to withdraw deposited ether freely.
/// You can get money for free
contract OpenVaultChallenge {
    bool public isSolved;

    constructor() payable {
        require(msg.value >= 1, "rule: send at least one wei");
    }

    function withdraw() external {
        require(
            tx.origin != msg.sender,
            "tx.origin is not equal to msg.sender"
        );
        require(!isContract(msg.sender), "invalid sender");

        payable(msg.sender).transfer(address(this).balance);

        isSolved = true;
    }

    function isContract(address _account) public view returns (bool) {
        return _account.code.length > 0;
    }
}
