import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import SplashScreen2 from "./screens/SplashScreen2";
import SplashScreen3 from "./screens/SplashScreen3";
import SplashScreen4 from "./screens/SplashScreen4";
import SplashScreen5 from "./screens/SplashScreen5";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyDFDPLXz0IzK1G3JVg5fRZSNtGKos-sOYk",
  authDomain: "smolley-9b48c.firebaseapp.com",
  projectId: "smolley-9b48c",
  storageBucket: "smolley-9b48c.appspot.com",
  messagingSenderId: "1093592090082",
  appId: "1:1093592090082:web:50a3880748f87f483b65bb",
  measurementId: "G-PLM2DNPPYR",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import AccountSuccess from "./screens/AccountSuccess";
import CameraScreen from "./screens/CameraScreen";
import ClaimReward from "./screens/ClaimReward";
import KidsHomePage from "./screens/KidsHomePage";
import Login from "./screens/Login";
import ResetPassword from "./screens/Reset Password";
import Rewards from "./screens/Rewards";
import SaveScreen from "./screens/SaveScreen";
import SignupParent from "./screens/SignupParent";
import TimelineScreen from "./screens/TimelineScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Requesting Permission...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>;
  }

  let loginState = "SplashScreen";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SplashScreen2"
          component={SplashScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SplashScreen3"
          component={SplashScreen3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SplashScreen4"
          component={SplashScreen4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SplashScreen5"
          component={SplashScreen5}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupParent"
          component={SignupParent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountSuccess"
          component={AccountSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KidsHomePage"
          component={KidsHomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TimelineScreen"
          component={TimelineScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Save"
          component={SaveScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClaimReward"
          component={ClaimReward}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rewards"
          component={Rewards}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   {/* <Text>Hello world</Text> */}
    //   {/* <SignupParent /> */}
    //   {/* <AccountSuccess /> */}
    //   {/* <AddChild /> */}

    //   <SignupParent />
    //   {/* <SplashScreen5 /> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
