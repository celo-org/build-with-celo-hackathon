import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { theme } from './theme'
import store from './store'
import AppNavigator from './navigation/AppNavigation'
import { USER_STORE } from './constants'
import { getUserDetails } from './storage'
import { setUserDetails, setToken } from '../features/essentials/essentialSlice'

export default function App() {
  const [isInitComplete, setIsInitComplete] = useState()
  //Load Resources during splash screen
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()
        //Check Accounts
        const result = await getUserDetails(USER_STORE)
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
