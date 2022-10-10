import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen";
import FinanceScreen from "./screens/FinanceScreen";
import InvestScreen from "./screens/InvestScreen";
import DigDaoScreen from "./screens/DigDaoScreen"
import MainPage from "./screens/MainPage"
import { createDrawerNavigator } from '@react-navigation/drawer';
import SpeedDoc from "./screens/SpeedDocScreen"


export type StackParams = {
  Onboarding;
  MainPage;
}



const Drawer = createDrawerNavigator<StackParams>();

export default function App() {
  // const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

   

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
    return (
      // <SafeAreaProvider>
      //   <Navigation colorScheme={colorScheme} />
      //   <StatusBar />
      // </SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }} >
          <Drawer.Screen name="Onboarding" component={OnboardingScreen}/>
           <Drawer.Screen name="MainPage" component={MainPage}/>
           <Drawer.Screen name="SpeedDoc" component={SpeedDoc}/>
          {/* <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Finance" component={FinanceScreen}/>
          <Stack.Screen name="Invest" component={InvestScreen}/>
          <Stack.Screen name="DigDao" component={DigDaoScreen}/> */}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  
}
