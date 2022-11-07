import celoHelper from '../../blockchain/helpers/celoHelper'
import { SPACES_STORE } from '../../app/constants'
import { getRoscaData, setRoscaDetails, fetchSpaces } from './spacesSlice'
import { SpaceListCache } from './spacesManager'
import { storeUserLoan } from '../../app/storage'
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
      const dueDate = new Date(result.nxtDeadline.toString() * 1000)
      const roscaDetails = {
        roscaName: result.roscaName,
        imgLink: result.imgLink,
        goalAmount: utils.formatUnits(result.goalAmount.toString(), 18),
        ctbDay: result.ctbDay,
        ctbOccur: result.ctbOccur,
        disbDay: result.disbDay,
        disbOccur: result.ctbOccur,
        dueDate: dueDate.toDateString(),
        activeMembers: utils.formatUnits(result.activeMembers.toString(), 0),
        currentRound: utils.formatUnits(result.currentRound.toString(), 0),
        creator: result.creator,
        roscaBal: utils.formatUnits(result.roscaBal.toString(), 18),
      }

      listenerApi.dispatch(setRoscaDetails(roscaDetails))
    },
  })
  startListening({
    actionCreator: fetchSpaces,
    effect: async (action, listenerApi) => {
      const results = await celoHelper.smartContractCall('Spaces', {
        method: 'getMySpaces',
        methodType: 'read',
      })
      results.forEach(async (result) => {
        const results = await celoHelper.smartContractCall('Rosca', {
          contractAddress: result[0],
          method: 'getDetails',
          methodType: 'read',
        })
        const dueDate = new Date(results.nxtDeadline.toString() * 1000)
        const spaceDetails = {
          addr: result[0],
          name: results.roscaName,
          initiated: result[1] === 'personal' ? true : false,
          value: utils.formatUnits(results.goalAmount.toString(), 'ether'),
          repaid: utils.formatUnits(results.roscaBal.toString(), 'ether'),
          dueDate: dueDate.toDateString(),
        }

        console.log(spaceDetails)
        await storeUserLoan(SPACES_STORE, spaceDetails)
        Object.assign(SpaceListCache, { [spaceDetails.address]: spaceDetails })
      })
    },
  })
}
