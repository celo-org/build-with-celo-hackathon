import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'

import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'

const AppStack = createNativeStackNavigator()

export default function AppNavigator() {
  const isLoggedIn = useSelector((s) => s.essential.isLoggedIn)
  return (
    //Use connecetion status to proceed and unlock plus has account to go to home
    <NavigationContainer>
      <AppStack.Navigator>
        {isLoggedIn ? (
          <AppStack.Screen
            name="MainStack"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <AppStack.Screen
            name="AuthStack"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
