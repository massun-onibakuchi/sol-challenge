# Sol Challenge

CTF-Like Challenges of smart contracts

## Installing

### Prerequisites

- node
- yarn

## Setup

Type on a terminal:

```bash
yarn
```

### Compiling

Type:

```bash
yarn compile
```

### Testing & Running Challenges

1. Copy this [template](./test/test.test.ts) to `./test/<*Challenge>.test.ts` file.
2. Each `<*Challenge.sol>` file contains a description of the challenge.
3. Try to solve. Write tests to prove the solution works correctly.

#### Order of Challenges

1. GuessTheNumberChallenge.sol
2. WeirdVaultChallenge.sol
3. OpenValutChallenge.sol
4. NftSaleChallenge.sol
5. BankChallenge.sol
6. WrappedERC20Challenge.sol

To run a test type:

```bash
# run test against local network
yarn test test/<*Challenge>.test.ts
```

### About this challenges

[Slide [ja]](https://docs.google.com/presentation/d/17FKtVC1S29WFnQjq92_SiqGIS6EGuslHsUfuNv-NlXU/edit?usp=sharing)
