// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./Batchable.sol";

/// @notice Challenge Description
/// BankCoin is permission-less token. Drain the balance of deposited ETH.
contract Bank is ERC20("BankCoin", "BANK"), Batchable {
    function deposit() external payable {
        _mint(msg.sender, msg.value);
    }

    function depositTo(address account) external payable {
        _mint(account, msg.value);
    }

    function withdraw(uint256 amount) external {
        _burn(msg.sender, amount);
        Address.sendValue(payable(msg.sender), amount);
    }

    function withdrawFrom(address account, uint256 amount) external {
        uint256 currentAllowance = allowance(account, msg.sender);
        require(
            currentAllowance >= amount,
            "ERC20: withdraw amount exceeds allowance"
        );
        unchecked {
            _approve(account, msg.sender, currentAllowance - amount);
        }
        _burn(account, amount);
        Address.sendValue(payable(msg.sender), amount);
    }
}

contract BankChallenge {
    Bank public bank;

    constructor() payable {
        require(msg.value >= 1 ether, "rule: send some ether");

        bank = new Bank();
        bank.deposit{ value: msg.value }();
    }

    function isSolved() public view returns (bool) {
        return address(bank).balance == 0;
    }
}
