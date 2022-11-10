import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//Screens
import {
  WelcomeScreen,
  DummyScreen,
  UserDetailsScreen,
  VerificationScreen,
  SetPasscodeScreen,
  LoginScreen,
} from 'clixpesa/features/essentials'
import { ImportWalletScreen } from 'clixpesa/features/wallet'
import { useSelector } from 'react-redux'

const AuthStack = createNativeStackNavigator()

export default function AuthNavigator() {
  const hasAccount = useSelector((s) => s.essential.userDetails.userToken)
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      {hasAccount ? (
        <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      ) : (
        <AuthStack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
      )}

      <AuthStack.Group screenOptions={{ presentation: 'modal' }}>
        <AuthStack.Screen name="DummyModal" component={DummyScreen} />
        <AuthStack.Screen name="importWallet" component={ImportWalletScreen} />
        <AuthStack.Screen name="getUserDetails" component={UserDetailsScreen} />
        <AuthStack.Screen name="verifyPhoneNo" component={VerificationScreen} />
        <AuthStack.Screen name="setPasscode" component={SetPasscodeScreen} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  )
}
