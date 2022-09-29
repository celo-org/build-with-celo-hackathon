import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'

import { theme } from './theme'
import store from './store'
import AppNavigator from './navigation/AppNavigation'

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <AppNavigator />
      </Provider>
    </NativeBaseProvider>
  )
}
