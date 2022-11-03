const { ethers, artifacts } = require('hardhat')
const { expect } = require('chai')
const stableTokenAbi = require('./stableToken.json')

describe('Clixpesa Spaces', function () {
  let Spaces, SpacesIface, Rosca, RoscaIface, Token, addr1, addr2
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  before(async () => {
    const spacesContract = await ethers.getContractFactory('Spaces')
    Token = await ethers.getContractAt(stableTokenAbi, '0x874069fa1eb16d44d622f2e0ca25eea172369bc1')
    const signers = await ethers.getSigners()
    addr1 = signers[0]
    addr2 = signers[1]

    Spaces = await spacesContract.deploy()
    SpacesIface = new ethers.utils.Interface((await artifacts.readArtifact('Spaces')).abi)
    await Spaces.deployed()

    RoscaIface = new ethers.utils.Interface((await artifacts.readArtifact('Rosca')).abi)
  })

  it('Should create a rosca named Wajackoyas', async function () {
    const roscaDetails = {
      token: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      roscaName: 'Wajackoyas',
      imgLink: 'bit.ly/hthfdrer',
      authCode: 'gh23r6es',
      goalAmount: ethers.utils.parseEther('0.2').toString(),
      ctbAmount: ethers.utils.parseEther('0.1').toString(),
      ctbDay: 'Sunday',
      ctbOccurence: 'Weekly',
      disbDay: 'Monday',
      disbOccurence: 'Weekly',
    }

    const txResponse = await Spaces.createRosca(Object.values(roscaDetails))
    const txReceipt = await txResponse.wait()
    const thisLog = txReceipt.logs.find((el) => el.address === Spaces.address)
    const results = SpacesIface.parseLog({ data: thisLog.data, topics: thisLog.topics })

    Rosca = await ethers.getContractAt('Rosca', results.args.roscaAddress)
    expect(results.args.RD.roscaName).to.be.equal(roscaDetails.roscaName)
  })

  it('Member (addr2) should join the Rosca ', async function () {
    delay(5000)
    const authCode = 'gh23r6es'
    await Rosca.connect(addr2).joinRosca(authCode)
    delay(3000)
    const members = await Rosca.getMembers()
    const address = members.find((el) => el === addr2.address)
    expect(address).to.be.equal(addr2.address)
  })

  it('Members should fund round', async function () {
    const ctbAmount = ethers.utils.parseEther('0.1').toString()
    const roscaBal = await Token.balanceOf(Rosca.address)
    await Token.approve(Rosca.address, ctbAmount)
    await delay(5000)
    const allowance1 = await Token.allowance(addr1.address, Rosca.address)
    expect(allowance1.toString()).to.be.equal(ctbAmount)

    await Token.connect(addr2).approve(Rosca.address, ctbAmount)
    await delay(5000)
    const allowance2 = await Token.allowance(addr2.address, Rosca.address)
    expect(allowance2.toString()).to.be.equal(ctbAmount)

    await Rosca.fundRound(ctbAmount)
    await Rosca.connect(addr2).fundRound(ctbAmount)
    await delay(2000)
    const newRoscaBal = await Token.balanceOf(Rosca.address)
    expect(newRoscaBal).to.be.greaterThan(roscaBal)
  })

  it('Should payout dueMember', async function () {
    const balance = await Token.balanceOf(addr1.address)
    await Rosca.withdrawFunds()
    delay(5000)
    const newBalance = await Token.balanceOf(addr1.address)
    expect(newBalance).to.be.greaterThan(balance)
  })
})
