import { fetchLoans, fetchOffers, setOffers, updateLoans } from './loansSlice'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { utils } from 'ethers'
import { getDefaultNewLoanName, getLoans, loansListCache } from './loansManager'
import { LOANS_STORE } from 'clixpesa/app/constants'
import { storeUserLoan } from 'clixpesa/app/storage'
import { areAddressesEqual } from '../../blockchain/utils/addresses'

export const loansListeners = (startListening) => {
  startListening({
    actionCreator: fetchOffers,
    effect: async (action, listenerApi) => {
      let offers = []
      const address = listenerApi.getState().loans.ONRsAddr
      const results = await celoHelper.smartContractCall('ONRs', {
        contractAddress: address,
        method: 'getAllOffers',
        methodType: 'read',
      })
      results.forEach((result) => {
        offers.push({
          id: result.id,
          lender: result.lender,
          lenderName: result.lenderName,
          principal: utils.formatUnits(result.principal, 'ether'),
          minLimit: utils.formatUnits(result.minLimit, 'ether'),
          maxLimit: utils.formatUnits(result.maxLimit, 'ether'),
          interest: utils.formatUnits(result.interest, 2),
          minDuration: utils.formatUnits(result.minDuration, 0), //in days
          maxDuration: utils.formatUnits(result.maxDuration, 0), //in days
        })
      })
      listenerApi.dispatch(setOffers(offers))
    },
  })
  startListening({
    actionCreator: updateLoans,
    effect: async (action, listenerApi) => {
      const results = await celoHelper.smartContractCall('Loans', {
        method: 'getMyLoans',
        methodType: 'read',
      })
      const loans = await getLoans()
      results.forEach(async (result) => {
        const results = await celoHelper.smartContractCall('P2PLoan', {
          contractAddress: result[0],
          method: 'getLoanDetails',
          methodType: 'read',
        })
        const thisLoan = loans.find((loan) => areAddressesEqual(loan.address, result[0]))
        console.log(thisLoan)
        const dueDate = new Date(results[11].toString() * 1)
        const balance = utils.formatUnits(results[8], 'ether')
        console.log(balance)
        const loanDetails = {
          pending: balance > 0.0 ? false : true,
          name: thisLoan.name,
          address: result[0],
          balance: balance > 0.0 ? balance : utils.formatUnits(results[6], 'ether'),
          paid: 0,
          dueDate: dueDate.toDateString(),
          initiated: result[1],
        }
        console.log(loanDetails)
        //await storeUserLoan(LOANS_STORE, loanDetails)
        //Object.assign(loansListCache, { [loanDetails.address]: loanDetails })
      })
    },
  })
  startListening({
    actionCreator: fetchLoans,
    effect: async (action, listenerApi) => {
      const results = await celoHelper.smartContractCall('Loans', {
        method: 'getMyLoans',
        methodType: 'read',
      })
      results.forEach(async (result) => {
        const results = await celoHelper.smartContractCall('P2PLoan', {
          contractAddress: result[0],
          method: 'getLoanDetails',
          methodType: 'read',
        })
        const loanName = await getDefaultNewLoanName()
        const dueDate = new Date(results[11].toString() * 1)
        const balance = utils.formatUnits(results[8], 'ether')
        const loanDetails = {
          pending: balance > 0 ? false : true,
          name: loanName,
          address: result[0],
          balance: balance > 0 ? balance : utils.formatUnits(results[6], 'ether'),
          paid: 0,
          dueDate: dueDate.toDateString(),
          initiated: result[1],
        }
        await storeUserLoan(LOANS_STORE, loanDetails)
        Object.assign(loansListCache, { [loanDetails.address]: loanDetails })
      })
    },
  })
}
