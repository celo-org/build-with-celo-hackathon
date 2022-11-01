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

const AccountSuccess = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.onboard}>
      <Text style={styles.title}>Account created successfully</Text>
      <Image source={require("../assets/OK.png")} style={styles.OK} />
      <View style={styles.justify}>
        <TouchableOpacity
          onPress={() => navigation.navigate("KidsHomePage")}
          style={[styles.buttonText]}
        >
          <ImageBackground
            source={require("../assets/Button.png")}
            style={styles.button}
          >
            <Text style={[styles.buttonContent, { color: "white" }]}>Next</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Create your child's account</Text>
      </View>

      <Image
        source={require("../assets/landscape.png")}
        style={styles.footer}
      />
    </View>
  );
};

export default AccountSuccess;

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    color: "#52B848",
    fontFamily: "BubblegumSans_400Regular",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "BubblegumSans_400Regular",
    color: "#52B848",
    paddingTop: 5,
  },
  onboard: {
    alignItems: "center",

    marginTop: 100,
  },
  OK: {
    marginTop: 50,
    height: 200,
    width: 200,
  },
  justify: {
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    height: 80,
    width: win.width - 132,
    resizeMode: "stretch",
    marginTop: 50,
  },
  footer: {
    position: "absolute",
    height: 250,
    width: win.width,
    resizeMode: "stretch",
    marginTop: win.height - 292,
  },
});
