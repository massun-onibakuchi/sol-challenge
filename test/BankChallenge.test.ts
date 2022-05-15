import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { BankChallenge } from '../typechain-types'

const toWei = ethers.utils.parseEther

describe('BankChallenge', async function () {
  let player: SignerWithAddress
  let challenge: BankChallenge

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('BankChallenge')
    challenge = (await Challenge.deploy({
      value: toWei('100'),
    })) as BankChallenge
  })

  it('Attack', async function () {
    expect(await challenge.isSolved()).to.be.true
  })
})
