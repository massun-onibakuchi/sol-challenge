import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { GuessTheHashChallenge } from '../typechain-types'

describe('GuessTheHashChallenge', async function () {
  let player: SignerWithAddress
  let challenge: GuessTheHashChallenge

  beforeEach(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('GuessTheHashChallenge')
    challenge = (await Challenge.deploy()) as GuessTheHashChallenge
  })

  it('Attack', async function () {
    const a = 0 // input a number
    await challenge.guess(a)
    expect(await challenge.isSolved()).to.be.true
  })
})
