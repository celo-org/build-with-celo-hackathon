// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
// Utils
import { ContextProvider } from "./utils/contextModule";
// Screens
import Setup from "./screens/setups"
import Payments from "./screens/payments"
import DepositCrypto from './screens/depositCrypto';
import DepositFiat from './screens/depositFiat';
import CryptoAccount from './screens/cryptoAccount';
import MyWalletConnect from "./screens/wcComponent"
import WithdrawCrypto from './screens/cryptoAccountComponents/withdrawCrypto';
import CryptoMainTransactions from './screens/cryptoAccountComponents/cryptoMainTransactions';
import FiatAccount from './screens/fiatAccount';
import FiatMainTransactions from './screens/fiatAccountComponents/fiatMainTransactions';
import WithdrawFiat from './screens/fiatAccountComponents/withdrawFiat';

import SplashScreen from "react-native-splash-screen";

const Stack = createNativeStackNavigator();

class App extends React.Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <ContextProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator
            //initialRouteName="Setup"
            initialRouteName="Setup"
            screenOptions={{
              headerShown: false,
              animation: 'none'
            }}
          >
            {
              // Setup
            }
            <Stack.Screen name="Setup" component={Setup} />
            {
              // Mains
            }
            <Stack.Screen name="Payments" component={Payments} />
            <Stack.Screen name="CryptoAccount" component={CryptoAccount} />
            <Stack.Screen name="FiatAccount" component={FiatAccount} />
            {
              // Sub Payments
            }
            <Stack.Screen name="DepositCrypto" component={DepositCrypto} />
            <Stack.Screen name="DepositFiat" component={DepositFiat} />
            <Stack.Screen name="Wallet" component={MyWalletConnect} />
            {
              // Sub Crypto Account
            }
            <Stack.Screen name="CryptoCashOut" component={WithdrawCrypto} />
            <Stack.Screen name="CryptoTransactions" component={CryptoMainTransactions} />
            {
              // Sub Fiat Account
            }
            <Stack.Screen name="FiatTransactions" component={FiatMainTransactions} />
            <Stack.Screen name="WithdrawFiat" component={WithdrawFiat} />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    );
  }
}

export default App;