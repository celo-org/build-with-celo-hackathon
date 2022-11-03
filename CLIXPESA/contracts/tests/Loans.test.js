const { ethers, artifacts } = require('hardhat')
const { expect } = require('chai')
const stableTokenAbi = require('./stableToken.json')

describe('Clixpesa P2PLoans', function () {
  let Loans,
    LoansIface,
    LoanONRs,
    ONRsIface,
    P2PLoan,
    P2PLoanIface,
    Token,
    addr1,
    addr2,
    addr1Loan,
    addr2Loan

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  before(async () => {
    const loansContract = await ethers.getContractFactory('Loans')
    Token = await ethers.getContractAt(stableTokenAbi, '0x874069fa1eb16d44d622f2e0ca25eea172369bc1')
    const signers = await ethers.getSigners()
    addr1 = signers[0]
    addr2 = signers[1]

    Loans = await loansContract.deploy()
    LoansIface = new ethers.utils.Interface((await artifacts.readArtifact('Loans')).abi)
    await Loans.deployed()
    const loanONRsAddr = await Loans.getONRsAddr()
    ONRsIface = new ethers.utils.Interface((await artifacts.readArtifact('LoanONRs')).abi)
    LoanONRs = await ethers.getContractAt('LoanONRs', loanONRsAddr)
    P2PLoanIface = new ethers.utils.Interface((await artifacts.readArtifact('P2PLoan')).abi)
  })

  it('Should Create an Offer', async function () {
    const offerID = 'AQ7FWWCu20dzF-BHelafw'

    const offerData = {
      id: offerID,
      lender: addr1.address,
      lenderName: 'Dekan Kachi',
      principal: ethers.utils.parseEther('0.2').toString(),
      minLimit: ethers.utils.parseEther('0.1').toString(),
      maxLimit: ethers.utils.parseEther('0.2').toString(),
      interest: 5 * 100,
      minDuration: 1 * 7,
      maxDuration: 2 * 7,
    }

    const txResponse = await LoanONRs.createOffer(Object.values(offerData))
    const txReceipt = await txResponse.wait()
    const thisLog = txReceipt.logs.find((el) => el.address === LoanONRs.address)
    const results = ONRsIface.parseLog({ data: thisLog.data, topics: thisLog.topics })
    expect(results.args[1][0]).to.be.equal(offerID)
  })

  it('Should get my offers', async function () {
    const offerID = 'AQ7FWWCu20dzF-BHelafw'
    const results = await LoanONRs.getMyOffers()
    expect(results[0].id).to.be.equal(offerID)
  })

  it('Should get all offers', async function () {
    const results = await LoanONRs.getMyOffers()
    expect(results.length).to.be.greaterThan(0)
  })

  it('Offer should exist', async function () {
    const offerID = 'AQ7FWWCu20dzF-BHelafw'
    const results = await LoanONRs.doesOfferExist(addr1.address, offerID)
    expect(results).to.be.true
  })

  it('Should borrow and initiate a loan', async function () {
    const deadline = new Date(Date.now() + 604800000)
    const loanData = {
      id: 'AQ7FWWCu20dzF-BHelafw',
      token: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      lender: addr1.address,
      lenderName: 'Dekan Kachi',
      borrower: addr2.address,
      borrowerName: 'Akimbo Keya',
      principal: ethers.utils.parseEther('0.1').toString(),
      interest: 5 * 100,
      balance: ethers.utils.parseEther('0').toString(),
      paid: ethers.utils.parseEther('0').toString(),
      minDuration: 7,
      maxDuration: 14,
      deadline: Date.parse(deadline.toDateString() + ' 11:59 pm'),
    }

    const txResponse = await Loans.connect(addr2).BorrowLoan(Object.values(loanData))
    const txReceipt = await txResponse.wait()
    const thisLog = txReceipt.logs.find((el) => el.address === Loans.address)
    const results = LoansIface.parseLog({ data: thisLog.data, topics: thisLog.topics })
    addr1Loan = results.args[0]
    addr2Loan = results.args[0]
    expect(results.args[2][0]).to.be.equal('AQ7FWWCu20dzF-BHelafw')
    P2PLoan = await ethers.getContractAt('P2PLoan', addr1Loan)
  })

  it('Should get my loans', async function () {
    const result1 = await Loans.getMyLoans()
    expect(result1[0][0]).to.be.equal(addr1Loan)
    const result2 = await Loans.connect(addr2).getMyLoans()
    expect(result2[0][0]).to.be.equal(addr2Loan)
  })

  it('Should get the Loan and match lender, borrower, principal and deadline', async function () {
    const results = await P2PLoan.getLoanDetails()
    expect(results.lender).to.be.equal(addr1.address)
    expect(results.borrower).to.be.equal(addr2.address)
    expect(ethers.utils.formatUnits(results.principal, 'ether')).to.be.equal('0.1')
  })

  it('Should fund loan and credit borrower', async function () {
    const amount = ethers.utils.parseEther('0.1').toString()
    const balance2 = await Token.balanceOf(addr2.address)
    await Token.approve(addr1Loan, amount)
    delay(5000)
    const allowance = await Token.allowance(addr1.address, addr1Loan)
    expect(allowance.toString()).to.be.equal(amount)

    const txResponse = await P2PLoan.FundLoan(amount)
    const txReceipt = await txResponse.wait()
    const thisLog = txReceipt.logs.find((el) => el.address === addr1Loan)
    const results = P2PLoanIface.parseLog({ data: thisLog.data, topics: thisLog.topics })
    expect(results.args[2].toString()).to.be.equal(amount)
    delay(3000)
    const newBalance2 = await Token.balanceOf(addr2.address)
    console.log('Borrowers NewBal: ' + newBalance2.toString())
    expect(newBalance2.toString() * 1).to.be.greaterThan(balance2.toString() * 1)

    const updatedLoan = await P2PLoan.getLoanDetails()
    expect(updatedLoan.balance.toString()).to.be.equal(amount)
  })

  it('Should Repay half the loan balance', async function () {
    const loan = await P2PLoan.getLoanPayDetails()
    const balance1 = await Token.balanceOf(addr1.address)
    const amountToPay = loan.balance.toString() / 2
    await Token.connect(addr2).approve(addr2Loan, amountToPay.toString())
    delay(5000)
    const allowance = await Token.allowance(addr2.address, addr2Loan)
    console.log('Approved amount: ' + allowance.toString())
    expect(allowance.toString()).to.be.equal(amountToPay.toString())

    const txResponse = await P2PLoan.connect(addr2).RepayLoan(amountToPay.toString())
    const txReceipt = await txResponse.wait()
    const thisLog = txReceipt.logs.find((el) => el.address === addr2Loan)
    const results = P2PLoanIface.parseLog({ data: thisLog.data, topics: thisLog.topics })
    expect(results.args[2].toString()).to.be.equal(amountToPay.toString())
    delay(3000)
    const newBalance1 = await Token.balanceOf(addr1.address)
    expect(newBalance1.toString() * 1).to.be.greaterThan(balance1.toString() * 1)

    const updatedLoan = await P2PLoan.getLoanDetails()
    expect(updatedLoan.balance.toString()).to.be.equal(amountToPay.toString())
    expect(updatedLoan.paid.toString()).to.be.equal(amountToPay.toString())
  })
})
