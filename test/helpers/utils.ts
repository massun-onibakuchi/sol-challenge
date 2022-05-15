import { expect } from 'chai'
import { BigNumber, BigNumberish, Signer } from 'ethers'
import hre, { ethers, network } from 'hardhat'

const toWei = ethers.utils.parseEther

async function overwriteStorage(
  address: string,
  slot: string,
  value: BigNumber
) {
  const hexValue = '0x' + value.toHexString().slice(2).padStart(64, '0')
  const prevValue = await network.provider.send('eth_getStorageAt', [
    address,
    slot,
  ])
  console.log(`Set Storage at ${slot} from ${prevValue} to ${hexValue}`)

  await network.provider.send('hardhat_setStorageAt', [address, slot, hexValue])
}

async function getStorageAt(address: string, slot: string) {
  return await network.provider.send('eth_getStorageAt', [address, slot])
}

async function getImpersonatedSigner(address: string): Promise<Signer> {
  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  })

  const signer = await ethers.getSigner(address)

  return signer
}

async function resetFork(blockNumber?, jsonRpcUrl?) {
  await network.provider.request({
    method: 'hardhat_reset',
    params: [
      {
        forking: {
          jsonRpcUrl: jsonRpcUrl || hre.config.networks.hardhat.forking.url,
          blockNumber,
        },
      },
    ],
  })
}

async function snapshot() {
  return network.provider.send('evm_snapshot', [])
}

async function restore(snapshotId) {
  return network.provider.send('evm_revert', [snapshotId])
}

async function latestTime(): Promise<number> {
  const { timestamp } = await ethers.provider.getBlock(
    await ethers.provider.getBlockNumber()
  )

  return timestamp as number
}

async function mine(): Promise<void> {
  await network.provider.request({
    method: 'evm_mine',
  })
}

/// credit to Fei Protocol
// expectApproxAbs(a, b, c) checks if b is between [a-c, a+c]
function expectApproxAbs(
  actual: BigNumberish,
  expected: BigNumberish,
  diff = '1000'
) {
  const actualBN = BigNumber.from(actual)
  const expectedBN = BigNumber.from(expected)
  const diffBN = BigNumber.from(diff)

  const lowerBound = expectedBN.sub(diffBN)
  const upperBound = expectedBN.add(diffBN)

  expect(actualBN).to.be.gte(lowerBound)
  expect(actualBN).to.be.lte(upperBound)
}

/// credit to Euler finance : Brute Force Storage Layout Discovery in ERC20 Contracts With Hardhat
/// https://blog.euler.finance/brute-force-storage-layout-discovery-in-erc20-contracts-with-hardhat-7ff9342143ed
async function findBalancesSlot(tokenAddress) {
  const encode = (types, values) =>
    ethers.utils.defaultAbiCoder.encode(types, values)

  const account = ethers.constants.AddressZero
  const probeA = encode(['uint'], [1])
  const probeB = encode(['uint'], [2])
  const token = await ethers.getContractAt('ERC20', tokenAddress)
  for (let i = 0; i < 100; i++) {
    let probedSlot = ethers.utils.keccak256(
      encode(['address', 'uint'], [account, i])
    )
    // remove padding for JSON RPC
    while (probedSlot.startsWith('0x0')) probedSlot = '0x' + probedSlot.slice(3)
    const prev = await network.provider.send('eth_getStorageAt', [
      tokenAddress,
      probedSlot,
      'latest',
    ])
    // make sure the probe will change the slot value
    const probe = prev === probeA ? probeB : probeA

    await network.provider.send('hardhat_setStorageAt', [
      tokenAddress,
      probedSlot,
      probe,
    ])

    const balance = await token.balanceOf(account)
    // reset to previous value
    await network.provider.send('hardhat_setStorageAt', [
      tokenAddress,
      probedSlot,
      prev,
    ])
    if (balance.eq(ethers.BigNumber.from(probe))) return i
  }
  throw 'Balances slot not found!'
}

export {
  toWei,
  overwriteStorage,
  getStorageAt,
  getImpersonatedSigner,
  resetFork,
  snapshot,
  restore,
  latestTime,
  mine,
  expectApproxAbs,
  findBalancesSlot,
}
