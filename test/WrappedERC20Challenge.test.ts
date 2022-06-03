import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { WrappedERC20, WrappedERC20Challenge } from '../typechain-types'
import { toWei } from './helpers/utils'

describe('WrappedERC20Challenge', async function () {
  let player: SignerWithAddress
  let challenge: WrappedERC20Challenge

  beforeEach(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('WrappedERC20Challenge')
    challenge = (await Challenge.deploy({
      value: toWei('10'),
    })) as WrappedERC20Challenge
  })

  it('Attack', async function () {
    expect(await challenge.isSolved()).to.be.true
  })
})
