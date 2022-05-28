// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

/// @title Synthetix-like proxy interface
/// ref: SNX https://etherscan.io/address/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f#code

interface Proxyable is IERC20Metadata {
    function proxy() external view returns (Proxy);

    function setProxy(address payable _proxy) external;

    function setMessageSender(address sender) external;
}

/**
 * @notice
 * A proxy contract that, if it does not recognise the function
 * being called on it, passes all value and call data to an
 * underlying target contract.
 *
 * This proxy has the capacity to toggle between DELEGATECALL
 * and CALL style proxy functionality.
 *
 * The former executes in the proxy's context, and so will preserve
 * msg.sender and store data at the proxy address. The latter will not.
 * Therefore, any contract the proxy wraps in the CALL style must
 * implement the Proxyable interface, in order that it can pass msg.sender
 * into the underlying contract as the state parameter, messageSender.
 **/
interface Proxy {
    function target() external view returns (Proxyable);

    function useDELEGATECALL() external view returns (bool);

    function setTarget(Proxyable _target) external;

    function setUseDELEGATECALL(bool value) external;
}

/**
 * @notice Synthetix-like proxy Implementaion with explicit ERC20 standard
 **/
interface ProxyERC20 is Proxy, IERC20Metadata {} // prettier-ignore
