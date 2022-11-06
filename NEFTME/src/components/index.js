/* eslint-disable no-undef */
import './global.ts';
import * as Device from 'expo-device';

const { registerRootComponent, scheme } = require('expo');

const { default: AsyncStorage } = require('@react-native-async-storage/async-storage');
const { withWalletConnect } = require('@walletconnect/react-native-dapp');
const { LogBox } = require('react-native');
const { default: App } = require('./app');

LogBox.ignoreLogs([
  "The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  "The provided value 'ms-stream' is not a valid 'responseType'.",
]);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(withWalletConnect(App, {
  redirectUrl: Device.osName === 'web' ? window.location.origin : `${scheme}://`,
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
}));
