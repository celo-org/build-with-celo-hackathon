import { registerRootComponent } from 'expo'
import 'react-native-get-random-values'
import '@ethersproject/shims'

import App from './app/App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
