import "dotenv/config"
import { HardhatUserConfig } from "hardhat/config"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const BLOCK_NUMBER = process.env.BLOCK_NUMBER
const MNEMONIC = process.env.MNEMONIC
const FORK = process.env.FORK

if (FORK && !ALCHEMY_API_KEY) throw new Error("ALCHEMY_API_KEY_NOT_FOUND")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        local: {
            url: "http://127.0.0.1:8545",
        },
        hardhat: {
            forking:
            {
                enabled: FORK === "true",
                url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
                blockNumber: BLOCK_NUMBER ? Number(BLOCK_NUMBER) : undefined
            }
        },
        mainnet: {
            url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            chainId: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.10",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    // outputSelection: {
                    //     '*': {
                    //         '*': ['storageLayout']
                    //     }
                    // }
                },
            },
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    }
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}

export default config
