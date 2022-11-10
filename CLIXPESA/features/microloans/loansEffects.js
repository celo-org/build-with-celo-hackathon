import { fetchLoans, fetchOffers, setOffers, updateLoans } from './loansSlice'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { utils } from 'ethers'
import { getDefaultNewLoanName, getLoans, loansListCache } from './loansManager'
import { LOANS_STORE } from 'clixpesa/app/constants'
import { storeUserLoan, modifyLoanDetails } from 'clixpesa/app/storage'
import { areAddressesEqual } from '../../blockchain/utils/addresses'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

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
      if (loans.length > 0) {
        results.forEach(async (result) => {
          const results = await celoHelper.smartContractCall('P2PLoan', {
            contractAddress: result[0],
            method: 'getLoanDetails',
            methodType: 'read',
          })
          const thisLoan = loans.find((loan) => areAddressesEqual(loan.address, result[0]))
          const dueDate = new Date(results[12].toString() * 1)
          const balance = utils.formatUnits(results[8], 'ether')
          const paid = utils.formatUnits(results[9], 'ether')
          const loanDetails = {
            pending: balance == 0.0 && paid == 0.0 ? true : false,
            name: thisLoan.name,
            address: result[0],
            principal: utils.formatUnits(results[6], 'ether'),
            balance:
              balance == 0.0 && paid == 0.0 ? utils.formatUnits(results[6], 'ether') : balance,
            paid: utils.formatUnits(results[9], 'ether'),
            dueDate: dueDate.toDateString(),
            initiated: result[1],
          }
          try {
            await modifyLoanDetails(LOANS_STORE, loanDetails)
          } catch (error) {
            await storeUserLoan(LOANS_STORE, loanDetails)
          }

          Object.assign(loansListCache, { [loanDetails.address]: loanDetails })
        })
      } else {
        listenerApi.dispatch(fetchLoans())
      }
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
        wait(5000)
        const loanName = await getDefaultNewLoanName()
        const dueDate = new Date(results[12].toString() * 1)
        const balance = utils.formatUnits(results[8], 'ether')
        const loanDetails = {
          pending: balance > 0 ? false : true,
          name: loanName,
          address: result[0],
          principal: utils.formatUnits(results[6], 'ether'),
          balance: balance > 0 ? balance : utils.formatUnits(results[6], 'ether'),
          paid: utils.formatUnits(results[9], 'ether'),
          dueDate: dueDate.toDateString(),
          initiated: result[1],
        }
        await storeUserLoan(LOANS_STORE, loanDetails)
        Object.assign(loansListCache, { [loanDetails.address]: loanDetails })
      })
    },
  })
}
