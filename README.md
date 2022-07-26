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

### Running Challenges

1. Copy this [template](./test/template.test.ts) to `./test/<*Challenge>.test.ts` file.
2. Each `<*Challenge.sol>` file contains a description of the challenge.
3. Make `isSovled()` returns `true`. Write tests to prove the solution works correctly.

#### Order of Challenges

1. GuessTheNumberChallenge.sol
2. WeirdVaultChallenge.sol
3. OpenValutChallenge.sol
4. NftSaleChallenge.sol
5. BankChallenge.sol
6. WrappedERC20Challenge.sol
7. HodlChallenge.sol (state of the mainnet needs to be forked)
8. GuessTheHashChallenge.sol

### Testing

To run a test type:

```bash
# run test against local network
yarn test test/<*Challenge>.test.ts
```

Some of the challenges are required to be run on a forked network. You need access to an archive node like the free ones from [Alchemy](https://alchemyapi.io/). Create `.env` file and paste the API key.

Type:

```bash
cp .env.example .env
```

Then set the environment variable.

```bash
ALCHEMY_API_KEY=<Your Alchemy api key>
```

## Solutions

[Slide - Solutions[en]](https://docs.google.com/presentation/d/1Pfsjh3JldWZWph08N7GzUWTo1D-5ZScUYOLwxIPjG3M/edit#slide=id.ge56a954bf3_0_152)

[Slide - introduction[ja]](https://docs.google.com/presentation/d/17FKtVC1S29WFnQjq92_SiqGIS6EGuslHsUfuNv-NlXU/edit?usp=sharing)
