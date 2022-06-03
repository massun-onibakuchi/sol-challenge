import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Nft, NftSaleChallenge } from '../typechain-types'

describe('NftSaleChallenge', async function () {
  let wallet: SignerWithAddress
  let challenge: NftSaleChallenge

  beforeEach(async function () {
    ;[wallet] = await ethers.getSigners()
    const Challenge = await ethers.getContractFactory('NftSaleChallenge')
    challenge = (await Challenge.deploy()) as NftSaleChallenge
  })

  it('Attack', async function () {
    const nft = (await ethers.getContractFactory('Nft')).attach(
      await challenge.token()
    ) as Nft

    expect(await challenge.isSolved()).to.be.true
  })
})
