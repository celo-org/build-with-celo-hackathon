import {
  BubblegumSans_400Regular,
  useFonts,
} from "@expo-google-fonts/bubblegum-sans";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const win = Dimensions.get("window");
const SplashScreen5 = ({ navigation }) => {
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
            Create Account
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.justify}>
        <ImageBackground
          source={require("../assets/Button.png")}
          style={styles.button}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("SignupParent")}
            style={[styles.buttonText]}
          >
            <Text style={[styles.buttonContent, { color: "white" }]}>
              Parents
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.justify}>
        <ImageBackground
          source={require("../assets/Button.png")}
          style={styles.button}
        >
          <TouchableOpacity style={[styles.buttonText]}>
            <Text style={[styles.buttonContent, { color: "white" }]}>
              Schools
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.justify}>
        <ImageBackground
          source={require("../assets/Button.png")}
          style={styles.button}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={[styles.buttonText]}
          >
            <Text style={[styles.buttonContent, { color: "white" }]}>
              Login Instead
            </Text>
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

export default SplashScreen5;

const styles = StyleSheet.create({
  Head1: {
    fontSize: 24,
    paddingLeft: 66,
    paddingRight: 66,
    fontFamily: "BubblegumSans_400Regular",
  },
  justify: {
    justifyContent: "center",
    alignItems: "center",
  },
  note: {
    height: 200,
    width: win.width - 30,
    paddingLeft: 0,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  onboard: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContent: {
    alignSelf: "center",
    paddingTop: 30,
    fontFamily: "BubblegumSans_400Regular",
    fontSize: 24,
  },
  buttonText: {
    fontFamily: "BubblegumSans_400Regular",
  },
  button: { height: 80, width: win.width - 132, resizeMode: "stretch" },
  bottombar: {
    position: "absolute",
    marginTop: win.height - 220,
    height: 220,
    width: win.width,
  },
});
