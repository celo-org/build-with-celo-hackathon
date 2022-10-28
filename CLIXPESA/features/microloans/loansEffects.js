import { fetchOffers, setOffers } from './loansSlice'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { utils } from 'ethers'

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
}
