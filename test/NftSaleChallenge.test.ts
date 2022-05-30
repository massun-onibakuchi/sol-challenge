import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { NftSaleChallenge } from '../typechain-types'

describe('NftSaleChallenge', async function () {
  let wallet: SignerWithAddress
  let challenge: NftSaleChallenge

  before(async function () {
    ;[wallet] = await ethers.getSigners()
  })
  beforeEach(async function () {
    const Challenge = await ethers.getContractFactory('NftSaleChallenge')
    challenge = (await Challenge.deploy()) as NftSaleChallenge
  })

  it('Attack', async function () {
    expect(await challenge.isSolved()).to.be.true
  })
})
