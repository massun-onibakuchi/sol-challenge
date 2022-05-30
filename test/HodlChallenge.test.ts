import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ProxyERC20, HodlVault } from '../typechain-types'
import { getImpersonatedSigner, resetFork } from './helpers/utils'

/// @note provider url is required to run this challenge
const PROVIDER_URL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`

const BLOCK_NUMBER = 14850000
const SNX = '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'
const SNX_WHALE = '0xF977814e90dA44bFA03b6295A0616a897441aceC' // binance8

describe('HodlChallenge', async function () {
  let player: SignerWithAddress
  let snx: ProxyERC20
  let challenge
  before(async function () {
    await resetFork(BLOCK_NUMBER, PROVIDER_URL) // fork state at BLOCK_NUMBER
    player = (await getImpersonatedSigner(SNX_WHALE)) as any

    await ethers.provider.send('hardhat_setBalance', [
      player.address,
      '0xffffffffffffffffffffff',
    ])

    snx = (await ethers.getContractAt('ProxyERC20', SNX)) as ProxyERC20
    challenge = await (
      await ethers.getContractFactory('HodlChallenge')
    ).deploy()

    expect(await snx.name()).to.be.not.equal('') // check
  })
  after(async function () {
    await resetFork(BLOCK_NUMBER, PROVIDER_URL)
  })
  it('Attack', async function () {
    const vault = (await ethers.getContractFactory('HodlVault')).attach(
      await challenge.vault()
    ) as HodlVault

    // deposit SNX at least once
    const amotToDeposit = await snx.balanceOf(SNX_WHALE)
    await snx.connect(player).approve(vault.address, amotToDeposit)
    await vault.connect(player).hold(amotToDeposit)
    expect(await vault.holdMethodIsCalled()).to.be.true // should be true

    // TODO: Your solution below

    // check
    expect(await challenge.isSolved()).to.be.true
  })
})
