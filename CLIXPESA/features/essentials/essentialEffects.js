import { setIsConnected, setIsSignered, setLoggedIn, setUserToken } from './essentialSlice'
import { USER_STORE } from 'clixpesa/app/constants'
import { storeUserDetails } from 'clixpesa/app/storage'
import celoHelper from 'clixpesa/blockchain/helpers/celoHelper'
import { connectToProvider } from 'clixpesa/blockchain/provider'
import { getWallets } from '../wallet/walletsManager'
import { decryptDataWtoken } from '../../utils/encryption'

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
  startListening({
    actionCreator: setLoggedIn,
    effect: async (action, listenerApi) => {
      const { isConnected, userDetails } = listenerApi.getState().essential
      const address = listenerApi.getState().wallet.walletInfo.address
      console.log(address)
      //get private key from store
      const userWallets = await getWallets()
      const enPrivateKey = userWallets.find((w) => w.address === address).enPrivateKey
      const privateKey = await decryptDataWtoken(enPrivateKey, userDetails.userToken)

      if (isConnected) {
        if (privateKey && action.payload) {
          await celoHelper.setCeloSigner(privateKey)
          listenerApi.dispatch(setIsSignered(true))
        } else {
          console.log('Unable to set signer')
          listenerApi.dispatch(setIsSignered(false))
        }
      } else {
        try {
          await connectToProvider()
          listenerApi.dispatch(setIsConnected(true))
        } catch (error) {
          console.log('Unable to connect to provider', error)
          listenerApi.dispatch(setIsConnected(false))
        }
      }
    },
  })
}
