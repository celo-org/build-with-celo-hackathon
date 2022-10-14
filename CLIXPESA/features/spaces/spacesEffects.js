import celoHelper from '../../blockchain/helpers/celoHelper'
import { getRoscaData, setRoscaDetails } from './spacesSlice'
import { utils } from 'ethers'

export const spacesListeners = (startListening) => {
  startListening({
    actionCreator: getRoscaData,
    effect: async (action, listenerApi) => {
      const roscaAddr = action.payload
      const result = await celoHelper.smartContractCall('Rosca', {
        contractAddress: roscaAddr,
        method: 'getDetails',
        methodType: 'read',
      })

      const roscaDetails = {
        roscaName: result.roscaName,
        imgLink: result.imgLink,
        goalAmount: utils.formatUnits(result.goalAmount.toString(), 18),
        ctbDay: result.ctbDay,
        ctbOccur: result.ctbOccur,
        disbDay: result.disbDay,
        disbOccur: result.disbOccur,
        activeMembers: utils.formatUnits(result.activeMembers.toString(), 0),
        currentRound: utils.formatUnits(result.currentRound.toString(), 0),
        creator: result.creator,
        roscaBal: utils.formatUnits(result.roscaBal.toString(), 18),
      }

      listenerApi.dispatch(setRoscaDetails(roscaDetails))
    },
  })
}
