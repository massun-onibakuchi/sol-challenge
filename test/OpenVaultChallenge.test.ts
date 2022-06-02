import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { OpenVaultChallenge } from '../typechain-types'
import { toWei } from './helpers/utils'

describe('OpenVaultChallenge', async function () {
  let player: SignerWithAddress
  let challenge: OpenVaultChallenge

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('OpenVaultChallenge')
    challenge = (await Challenge.deploy({
      value: toWei('1'),
    })) as OpenVaultChallenge
  })

  it('Attack', async function () {
    expect(await challenge.isSolved()).to.be.true
  })
})
