import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import OnboardingScreen from "./screens/OnboardingScreen";
import MainPage from "./screens/MainPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SpeedDoc from "./screens/SpeedDocScreen";
import PageTwoScreen from "./screens/PageTwoScreen";
import PageThreeScreen from "./screens/PageThreeScreen";
import PageFourScreen from "./screens/PageFourScreen";
import PageFive from "./screens/PageFiveScreen";
import PageSix from "./screens/PageSixScreen";
import PageSeven from "./screens/PageSevenScreen";
import PageEight from "./screens/PageEightScreen";
import PageNine from "./screens/PageNineScreen";
import PageTen from "./screens/PageTenScreen";
import PageEleven from "./screens/PageElevenScreen";
import PageTwelve from "./screens/PageTwelveScreen";
import PageThirteen from "./screens/PageThirteenScreen";
import PageFourteen from "./screens/PageFourteenScreen";
import PageFifteen from "./screens/PageFifteenScreen";
import PageSixteen from "./screens/PageSixteenScreen";
import PageSeventeen from "./screens/PageSeventeenScreen";

import CustomDrawer from "./components/CustomDrawer";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import React from "react";
import { AuthContext } from "./components/context";
import DropDown from "./components/DropDown";

export type StackParams = {
  Onboarding: undefined;
  MainPage: undefined;
  SpeedDoc: undefined;
  PageTwo: undefined;
  PageThree: undefined;
  PageFour: undefined;
  PageFive: undefined;
  PageSix: undefined;
  PageSeven: undefined;
  PageEight: undefined;
  PageNine: undefined;
  PageTen: undefined;
  PageEleven: undefined;
  PageTwelve: undefined;
  PageThirteen: undefined;
  PageFourteen: undefined;
  PageFifteen: undefined;
  PageSixteen: undefined;
  PageSeventeen: undefined;
  DropDown: undefined;
};

const Drawer = createDrawerNavigator<StackParams>();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const authContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            initialRouteName="Onboarding"
            screenOptions={{
              headerShown: false,
              drawerActiveBackgroundColor: "#aa18ea",
              drawerActiveTintColor: "#fff",
              drawerInactiveTintColor: "#333",
              drawerLabelStyle: {
                marginLeft: 25,
                fontSize: 15,
              },
            }}
          >
            <Drawer.Screen name="Onboarding" component={OnboardingScreen} />
            <Drawer.Screen name="MainPage" component={MainPage} />
            <Drawer.Screen name="SpeedDoc" component={SpeedDoc} />
            <Drawer.Screen name="PageTwo" component={PageTwoScreen} />
            <Drawer.Screen name="PageThree" component={PageThreeScreen} />
            <Drawer.Screen name="PageFour" component={PageFourScreen} />
            <Drawer.Screen name="PageFive" component={PageFive} />
            <Drawer.Screen name="PageSix" component={PageSix} />
            <Drawer.Screen name="PageSeven" component={PageSeven} />
            <Drawer.Screen name="PageEight" component={PageEight} />
            <Drawer.Screen name="PageNine" component={PageNine} />
            <Drawer.Screen name="PageTen" component={PageTen} />
            <Drawer.Screen name="PageEleven" component={PageEleven} />
            <Drawer.Screen name="PageTwelve" component={PageTwelve} />
            <Drawer.Screen name="PageThirteen" component={PageThirteen} />
            <Drawer.Screen name="PageFourteen" component={PageFourteen} />
            <Drawer.Screen name="PageFifteen" component={PageFifteen} />
            <Drawer.Screen name="PageSixteen" component={PageSixteen} />
            <Drawer.Screen name="PageSeventeen" component={PageSeventeen} />
            <Drawer.Screen name="DropDown" component={DropDown} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}



/////////////////////////////////////////////////////////////////////

// please wrap the whole App with registerRootComponent(withWalletConnect(App)) as described baseGestureHandlerWithMonitorProps.
// This will handle web3 connection automatically instead of having to use conditions for checking if user has web3 withWalletConnect

import "./global";
import App from "./App";
import { baseGestureHandlerWithMonitorProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon";
import { registerRootComponent, scheme } from "expo";
const {
	default: AsyncStorage,
} = require("@react-native-async-storage/async-storage");
const { withWalletConnect } = require("@walletconnect/react-native-dapp");

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(
	withWalletConnect(App, {
		clientMeta: {
			name: "Quatrefinance digesu",
			description: "Tools for lifestyle finances",
		},
		redirectUrl:
			Platform.OS === "web" ? window.location.origin : `${scheme}://`,
		storageOptions: {
			asyncStorage: AsyncStorage,
		},
	})
);

//////////////////////////////////////////////////////////////////////