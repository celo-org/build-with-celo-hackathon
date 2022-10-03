import { setUserToken } from './essentialSlice'
import { USER_STORE } from 'clixpesa/app/constants'
import { storeUserDetails } from 'clixpesa/app/storage'

export const essentialListeners = (startListening) => {
  startListening({
    actionCreator: setUserToken,
    effect: async (action, listenerApi) => {
      const userDetails = listenerApi.getState().essential.userDetails
      if (userDetails.userToken !== action.payload) {
        throw new Error('Problem getting user token')
      }
      await storeUserDetails(USER_STORE, userDetails)
    },
  })
}
