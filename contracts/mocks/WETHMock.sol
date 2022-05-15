// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title WETH9 Mock: https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
///        WETH9 does not emit `Transfer` events when deposit/withdraw methods are called. but this mock does
contract WETHMock is ERC20("Wrapped ETH", "WETH") {
    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);

    /// @dev Original WETH9 implements `fallback` function instead of `receive` function due to a earlier solidity version
    fallback() external payable {
        deposit();
    }

    function deposit() public payable {
        _mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 wad) public {
        require(balanceOf(msg.sender) >= wad, "weth: insufficient balance");

        _burn(msg.sender, wad);
        (bool success, ) = msg.sender.call{ value: wad }("");
        require(success, "weth: failed");

        emit Withdrawal(msg.sender, wad);
    }
}
