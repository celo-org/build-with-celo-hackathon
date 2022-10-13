import celoHelper from '../../blockchain/helpers/celoHelper'
import { getRoscaData } from './spacesSlice'

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

      console.log(result)
    },
  })
}
