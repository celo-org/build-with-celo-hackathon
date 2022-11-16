import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  useFonts,
  BubblegumSans_400Regular,
} from "@expo-google-fonts/bubblegum-sans";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const win = Dimensions.get("window");

const SplashScreen3 = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.onboard}>
      <View style={styles.justify}>
        <ImageBackground
          source={require("../assets/note.png")}
          style={styles.note}
        >
          <Text style={[styles.Head1, { color: "#52B848" }]}>
            You Can Buy or Save to Buy That Toy, Bike, Ball & Many Others
          </Text>
        </ImageBackground>
      </View>

      <Image source={require("../assets/turtle3.png")} style={styles.turtle} />
      <View style={styles.justify}>
        <ImageBackground
          source={require("../assets/Button.png")}
          style={styles.button}
        >
          <TouchableOpacity
            style={[styles.buttonText]}
            onPress={() => navigation.navigate("SplashScreen4")}
          >
            <Text style={[styles.buttonContent, { color: "white" }]}>Next</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <Image
        source={require("../assets/landscape.png")}
        style={styles.bottombar}
      />
    </View>
  );
};

export default SplashScreen3;

const styles = StyleSheet.create({
  buttonContent: {
    alignSelf: "center",
    paddingTop: 30,
    fontFamily: "BubblegumSans_400Regular",
    fontSize: 24,
  },
  Head1: {
    fontSize: 24,
    paddingLeft: 66,
    paddingRight: 66,
    fontFamily: "BubblegumSans_400Regular",
  },

  buttonText: {
    fontFamily: "BubblegumSans_400Regular",
  },
  justify: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: { height: 80, width: win.width - 132, resizeMode: "stretch" },
  title: {
    height: 120,
    width: 240,
    marginTop: 400,
    position: "absolute",
    resizeMode: "stretch",
  },

  bottombar: {
    position: "absolute",
    marginTop: win.height - 220,
    height: 220,
    width: win.width,
  },
  note: {
    height: 100,
    width: win.width - 30,
    paddingLeft: 0,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  onboard: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  turtle: {
    height: 300,
    width: win.width,
    resizeMode: "stretch",
  },
});
