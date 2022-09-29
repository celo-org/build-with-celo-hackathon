import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//Screens
import { WelcomeScreen, DummyScreen } from 'clixpesa/features/essentials'

const AuthStack = createNativeStackNavigator()

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />

      <AuthStack.Group screenOptions={{ presentation: 'modal' }}>
        <AuthStack.Screen name="DummyModal" component={DummyScreen} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  )
}
