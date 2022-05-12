# Smart Contracts Vulns Hacking

## Getting Started

### Setup

`yarn`

To run testing on the forking main net, set the APIKEY and mnemonic.
you need access to an archive node like the free ones from [Alchemy](https://alchemyapi.io/).
```
ALCHEMY_API_KEY=
MNEMONIC=
BLOCK_NUMBER=
FORK=false
```

### Compiling

`yarn compile`

### Replaying hack

The hacks are implemented as hardhat tests and can therefore be run as:

`yarn hardhat test test/<name>.ts`

### Debugging transactions with tenderly

Set up `tenderly.yaml` in the repo root and follow [this article](http://blog.tenderly.co/level-up-your-smart-contract-productivity-using-hardhat-and-tenderly/).

TLDR:

```bash
# run this in second terminal
npx hardhat node
# run test against local network
npx hardhat test test/foo.js --network local
# you want an actual tx id which means the tx may not fail in eth_estimateGas already
# therefore hardcode some gas values
# {value: ethers.utils.parseEther(`100`), gasLimit: `15000000`, gasPrice: ethers.utils.parseUnits(`200`, 9) }
# the (failed) tx hash appears on the CLI after "eth_sendTransaction"
# --force is required to skip gas estimation check in tenderly
tenderly export <txHash> --force
```