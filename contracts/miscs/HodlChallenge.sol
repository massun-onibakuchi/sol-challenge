// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./ProxyERC20.sol";

/// @notice Challenge Description
/// HodlVault allows an account to hold a token for a specific period.
/// You can complete this challenge by empaty the following HodlVault for SNX.
/// @notice This challenge is required to setup forking mainnet state.
/// To run this challenge, You need access to an archive node like the free ones from Alchemy :https://alchemyapi.io/.

contract HodlVault is ERC20 {
    IERC20 public immutable token;

    address public governance;

    uint256 public unlocktimestamp;

    uint256 public minDelayTime = 5 * 3600 * 24 * 365; // default 5 years

    constructor(IERC20 _token, address _governance) ERC20("Hodl", "HODL") {
        token = _token;
        governance = _governance;
    }

    /// @notice deposit tokens and lock up for a certain period.
    function hold(uint256 amount) external {
        require(amount > 0, "zero");
        unlocktimestamp = block.timestamp + minDelayTime;

        token.transferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, amount);
    }

    /// @notice withdraw locked tokens if tokens can be unlocked
    function withdraw(uint256 amount) external {
        require(amount > 0, "zero");
        require(block.timestamp > unlocktimestamp, "lock");

        _burn(msg.sender, amount);
        token.transfer(msg.sender, amount);
    }

    /// @notice rescue tokens accidentally send
    function sweep(IERC20 _token) external {
        // You can not rescue locked token.
        require(token != _token, "!token");
        _token.transfer(governance, _token.balanceOf(address(this)));
    }

    function updateGovernance(address _governance) external {
        require(governance == msg.sender, "!gov");
        require(_governance != address(0), "zero");

        governance = _governance;
    }

    function updateMinDelayTime(uint256 _minDelayTime) external {
        require(governance == msg.sender, "!gov");

        minDelayTime = _minDelayTime;
    }

    function holdMethodIsCalled() external view returns (bool) {
        return unlocktimestamp > 0;
    }
}

contract HodlChallenge {
    uint256 public constant SNAPSHOT_BLOCK_NUMBER = 14850000;

    HodlVault public vault;

    /// @notice SNX is an DeFi governance token.
    /// This address is Mainnet Synthetix token. it implements ProxyERC20 interface
    /// The source code can be found in the the following link :
    /// https://etherscan.io/address/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f#code
    /// @dev
    /// Hardhat mainnet forking is available.
    /// await network.provider.request({
    ///     method: 'hardhat_reset',
    ///     params: [
    ///       {
    ///         forking: {
    ///           jsonRpcUrl: <jsonRpcUrl> || hre.config.networks.hardhat.forking.url,
    ///           blockNumber: <blockNumber>,
    ///         },
    ///       },
    ///     ],
    ///   })
    /// To get some SNX hardhat_impersonateAccount is useful.
    /// impersonate a SNX whale address such as 0xF977814e90dA44bFA03b6295A0616a897441aceC (Binance 8)
    ///   await network.provider.request({
    ///     method: 'hardhat_impersonateAccount',
    ///     params: [address],
    ///   })
    ///   const signer = await ethers.getSigner(address)
    IERC20 public constant SNX =
        ProxyERC20(0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F);

    constructor() {
        // deploy HodlVault for SNX
        vault = new HodlVault(SNX, address(this));
    }

    function isSolved() public view returns (bool) {
        require(vault.holdMethodIsCalled(), "rule: lock SNX at least once");
        return SNX.balanceOf(address(vault)) == 0;
    }
}
