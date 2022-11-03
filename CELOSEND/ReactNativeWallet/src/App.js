// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
// Utils
import { ContextProvider } from "./utils/contextModule";
// Screens
import Setup from "./screens/setups"
import CryptoAccount from './screens/cryptoAccount';
import WithdrawCrypto from './screens/cryptoAccountComponents/withdrawCrypto';
import CryptoCheckPin from './screens/cryptoAccountComponents/cryptoCheckPin';
import DepositCrypto from './screens/cryptoAccountComponents/depositCrypto';
import CheckPin from './screens/setupComponents/checkPin';
import Landing from './screens/landing';
import CryptoMainTransactions from './screens/cryptoAccountComponents/cryptoMainTransactions';
import FiatAccount from './screens/fiatAccount';
import Swap from './screens/swap';
import DepositFiat from './screens/fiatAccountComponents/depositFiat';
import WithdrawFiat from './screens/fiatAccountComponents/withdrawFiat';
import FiatCheckPin from './screens/fiatAccountComponents/fiatCheckPin';
import FiatMainTransactions from './screens/fiatAccountComponents/fiatMainTransactions';
import CashOut from './screens/fiatAccountComponents/cashout';
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
            <Stack.Screen name="CheckPin" component={CheckPin} />
            {
              // Mains
            }
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="CryptoAccount" component={CryptoAccount} />
            <Stack.Screen name="FiatAccount" component={FiatAccount} />
            <Stack.Screen name="Swap" component={Swap} />
            {
              // Sub Crypto Account
            }
            <Stack.Screen name="DepositCrypto" component={DepositCrypto} />
            <Stack.Screen name="WithdrawCrypto" component={WithdrawCrypto} />
            <Stack.Screen name="CryptoCheckPin" component={CryptoCheckPin} />
            <Stack.Screen name="CryptoTransactions" component={CryptoMainTransactions} />
            {
              // Sub Fiat Account
            }
            <Stack.Screen name="DepositFiat" component={DepositFiat} />
            <Stack.Screen name="WithdrawFiat" component={WithdrawFiat} />
            <Stack.Screen name="FiatCheckPin" component={FiatCheckPin} />
            <Stack.Screen name="FiatTransactions" component={FiatMainTransactions} />
            <Stack.Screen name="CashOut" component={CashOut} />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    );
  }
}

export default App;