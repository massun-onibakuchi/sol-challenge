// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20Permit, ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "../mocks/WETHMock.sol";

/// @notice Challenge Description
/// Tokens that satisfy a certain condition can be drained by anyone

/// @notice ERC20 wrapper
contract WrappedERC20 is ERC20Permit {
    using SafeERC20 for IERC20;

    address underlying;

    constructor(address _underlying)
        ERC20("WrappedERC20", "WERC20")
        ERC20Permit("WrappedERC20")
    {
        underlying = _underlying;
    }

    /// @notice token approval is required before deposit
    function deposit() external returns (uint256) {
        uint256 _amount = IERC20(underlying).balanceOf(msg.sender);
        IERC20(underlying).safeTransferFrom(msg.sender, address(this), _amount);
        return _deposit(_amount, msg.sender);
    }

    /// @notice token approval is required before deposit
    function deposit(uint256 amount) external returns (uint256) {
        IERC20(underlying).safeTransferFrom(msg.sender, address(this), amount);
        return _deposit(amount, msg.sender);
    }

    function depositWithPermit(
        address target,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address to
    ) external returns (uint256) {
        // permit is an alternative to the standard approve call:
        // it allows an off-chain secure signature to be used to register an allowance.
        // The permitter is approving the beneficiary to spend their money, by signing the permit request
        IERC20Permit(underlying).permit(
            target,
            address(this),
            value,
            deadline,
            v,
            r,
            s
        );
        IERC20(underlying).safeTransferFrom(target, address(this), value);
        return _deposit(value, to);
    }

    function _deposit(uint256 value, address to) internal returns (uint256) {
        _mint(to, value);
        return value;
    }

    /// @notice withdraw all
    function withdraw() external returns (uint256) {
        return _withdraw(msg.sender, balanceOf(msg.sender), msg.sender);
    }

    /// @notice withdraw specified `amount`
    function withdraw(uint256 amount) external returns (uint256) {
        return _withdraw(msg.sender, amount, msg.sender);
    }

    function _withdraw(
        address from,
        uint256 amount,
        address to
    ) internal returns (uint256) {
        _burn(from, amount);
        IERC20(underlying).safeTransfer(to, amount);
        return amount;
    }
}

contract WrappedERC20Challenge {
    WETHMock public immutable WETH;
    WrappedERC20 public immutable wwETH;

    constructor() payable {
        require(msg.value >= 10 * 1e18, "rule: send at least 10 ether");

        WETHMock _WETH = new WETHMock();
        wwETH = new WrappedERC20(address(_WETH));

        WETH = _WETH;

        //  convert eth to weth
        _WETH.deposit{ value: msg.value }();

        _WETH.approve(address(wwETH), type(uint256).max);
        // deposit half of weth balance
        wwETH.deposit(msg.value / 2);
    }

    function isSolved() public view returns (bool) {
        return WETH.balanceOf(address(this)) == 0;
    }
}
