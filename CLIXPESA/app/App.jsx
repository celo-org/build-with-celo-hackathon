import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { theme } from './theme'
import store from './store'
import AppNavigator from './navigation/AppNavigation'
import { USER_STORE, WALLETS_STORE } from './constants'
import { getUserDetails } from './storage'
import { connectToProvider } from '../blockchain/provider'
import { setUserDetails, setToken, setIsConnected } from '../features/essentials/essentialSlice'
import { getWallets } from '../features/wallet/walletsManager'
import { updateWalletAddress } from '../features/wallet/walletSlice'
import { LogBox } from 'react-native'

export default function App() {
  const [isInitComplete, setIsInitComplete] = useState()
  // avoid warnings showing up in app. comment below code if you want to see warnings.
  //useEffect(() => {
  //LogBox.ignoreLogs(['Encountered two children with the same key ...'])
  // LogBox.ignoreAllLogs()
  //}, [])
  // Start Provider
  useEffect(() => {
    async function initProvider() {
      try {
        await connectToProvider()
        store.dispatch(setIsConnected(true))
      } catch (error) {
        console.log('Unable to connect to provider', error)
        store.dispatch(setIsConnected(false))
      }
    }
    initProvider()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //Load Resources during splash screen
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()
        //Check Accounts
        const result = await getUserDetails(USER_STORE)
        const wallets = await getWallets(WALLETS_STORE)
        if (wallets.length > 0) {
          store.dispatch(updateWalletAddress(wallets[0].address))
        }
        if (result.userToken) {
          const userNames = result.names
          const phoneNumber = result.phoneNo
          store.dispatch(setUserDetails({ userNames, phoneNumber }))
          store.dispatch(setToken(result.userToken))
        }

        // Load fonts
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setIsInitComplete(true)
        SplashScreen.hideAsync()
      }
    }
    loadResourcesAndDataAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isInitComplete) {
    return null
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <Provider store={store}>
          <StatusBar style="auto" />
          <AppNavigator />
        </Provider>
      </NativeBaseProvider>
    )
  }
}
