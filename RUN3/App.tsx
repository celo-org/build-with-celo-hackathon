import React from 'react'
import Login from './src/Login'
import { useWalletProvider, WalletProvider } from './src/contexts/WalletContext'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Home/'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Header from './src/Header/'
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faRunning, faRoad } from '@fortawesome/free-solid-svg-icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }: { navigation: any; state: any }) => (
  <BottomNavigation
    style={{ height: 80 }}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="User Profile"
      icon={(props: any) => <FontAwesomeIcon color={props.style.tintColor} icon={faUser} size={20} />}
    />
    <BottomNavigationTab
      title="Move To Earn"
      icon={(props: any) => <FontAwesomeIcon color={props.style.tintColor} icon={faRunning} size={20} />}
    />
    <BottomNavigationTab
      title="Move To Build"
      icon={(props: any) => <FontAwesomeIcon color={props.style.tintColor} icon={faRoad} size={20} />}
    />
  </BottomNavigation>
)

const HomeApp = () => {
  return (
    <Tab.Navigator initialRouteName="homeApp" tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="Profile" component={Home} />
      <Tab.Screen name="Move To Earn" component={Home} />
    </Tab.Navigator>
  )
}

export default function App() {
  const { walletWithProvider } = useWalletProvider()

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <WalletProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={walletWithProvider ? 'home' : 'login'}>
            {/* Auth Navigator: Include Login and Signup */}
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            {/* Navigation Drawer as a landing page */}
            <Stack.Screen
              name="home"
              component={HomeApp}
              // Hiding header for Navigation Drawer
              options={{ headerTitle: (props) => <Header /> }}
              // options={({ route }) => ({
              //   headerTitle: getHeaderTitle(route),
              // })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </WalletProvider>
    </ApplicationProvider>
  )
}
