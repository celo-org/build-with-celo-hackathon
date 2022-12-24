import React from 'react'
import Login from './src/Components/Login'
import { useWalletProvider, WalletProvider } from './src/contexts/WalletContext'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Components/Home'
import { Text, LogBox } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Header from './src/Components/Header'
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faRunning, faRoad } from '@fortawesome/free-solid-svg-icons'
import MoveToEarn from './src/Components/MoveToEarn'
import { colors, globalStyles } from './src/utils/globalStyles'
import MoveToBuild from './src/Components/MoveToBuild'
import Builder from './src/Components/MoveToBuild/builder'
import RouteDetail from './src/Components/MoveToBuild/routeDetail'
import Ecostory from './src/Components/MoveToBuild/ecostory'
import EcoStoryForm from './src/Components/MoveToBuild/ecoStoryForm'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }: { navigation: any; state: any }) => (
  <BottomNavigation
    style={{ height: 80 }}
    indicatorStyle={{ backgroundColor: colors.secondary }}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title={() => <Text style={globalStyles.secondaryColor}>User Profile</Text>}
      icon={(props: any) => <FontAwesomeIcon color={colors.secondary} icon={faUser} size={20} />}
    />
    <BottomNavigationTab
      title={() => <Text style={globalStyles.secondaryColor}>Move To Earn</Text>}
      icon={(props: any) => <FontAwesomeIcon color={colors.secondary} icon={faRunning} size={20} />}
    />
    <BottomNavigationTab
      title={() => <Text style={globalStyles.secondaryColor}>Move To Build</Text>}
      icon={(props: any) => <FontAwesomeIcon color={colors.secondary} icon={faRoad} size={20} />}
    />
  </BottomNavigation>
)

const HomeApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="homeApp"
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Profile" component={Home} />
      <Tab.Screen name="Move To Earn" component={MoveToEarn} />
      <Tab.Screen name="Move To Build" component={MoveToBuild} />
    </Tab.Navigator>
  )
}

export default function App() {
  const { walletWithProvider } = useWalletProvider()
  LogBox.ignoreAllLogs()
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <WalletProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={walletWithProvider ? 'home' : 'login'}>
            {/* Auth Navigator: Include Login and Signup */}
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            {/* Navigation Drawer as a landing page */}
            <Stack.Screen name="home" component={HomeApp} options={{ headerTitle: (props) => <Header /> }} />
            <Stack.Screen name="builder" component={Builder} options={{ headerTitle: (props) => <Header /> }} />
            <Stack.Screen name="routeDetail" component={RouteDetail} options={{ headerTitle: (props) => <Header /> }} />
            <Stack.Screen name="ecostory" component={Ecostory} options={{ headerShown: false }} />
            <Stack.Screen name="ecoStoryForm" component={EcoStoryForm} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </WalletProvider>
    </ApplicationProvider>
  )
}
