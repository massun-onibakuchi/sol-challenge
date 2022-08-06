import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { GuessTheNumberChallenge2 } from '../typechain-types'

describe('GuessTheNumberChallenge2', async function () {
  let player: SignerWithAddress
  let challenge: GuessTheNumberChallenge2

  beforeEach(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('GuessTheNumberChallenge2')
    challenge = (await Challenge.deploy()) as GuessTheNumberChallenge2
  })

  it('Attack', async function () {
    const a = 0 // input a number
    await challenge.guess(a)
    expect(await challenge.isSolved()).to.be.true
  })
})
