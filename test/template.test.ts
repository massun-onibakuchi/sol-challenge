import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
// Replace CHALLENGE_CONTRACT with a contract name you want to deploy
// import { CHALLENGE_CONTRACT } from '../typechain-types'

/// Template
describe('Challenge Name', async function () {
  let player: SignerWithAddress
  let challenge: Contract

  beforeEach(async function () {
    ;[player] = await ethers.getSigners()

    // const Challenge = await ethers.getContractFactory('CHALLENGE_CONTRACT')
    // challenge = await Challenge.deploy(<constructor args>,{ value: <ETH value to send> })
  })

  it('Attack', async function () {
    // describe how to exploit the challenge
    // expect(await challenge.isSolved()).to.be.true
  })
})
