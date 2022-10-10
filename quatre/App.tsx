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


export type StackParams = {
  Onboarding;
  MainPage;
}

const Stack = createNativeStackNavigator<StackParams>();

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
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
           <Stack.Screen name="MainPage" component={MainPage}/>
          {/* <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Finance" component={FinanceScreen}/>
          <Stack.Screen name="Invest" component={InvestScreen}/>
          <Stack.Screen name="DigDao" component={DigDaoScreen}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  
}
