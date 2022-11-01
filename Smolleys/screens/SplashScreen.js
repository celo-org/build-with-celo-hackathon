import {
  BubblegumSans_400Regular,
  useFonts,
} from "@expo-google-fonts/bubblegum-sans";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
const win = Dimensions.get("window");
const SplashScreen = ({ navigation }) => {
  function nextPage() {
    console.log("papi");
  }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10000); //10000
  }, []);
  let [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  //seen
  //topbar
  //title

  return (
    <View>
      {loading ? (
        <View style={styles.seen}>
          <Image source={require("../assets/Sky.png")} style={styles.topbar} />
          {/* <Text style={styles.title}>Smolleys</Text>
            <Text>Banking for kids</Text> */}
          <Image source={require("../assets/Logo.png")} style={styles.title} />
          <Image
            source={require("../assets/landscape.png")}
            style={styles.bottombar}
          />
        </View>
      ) : (
        <View style={styles.onboard}>
          <View style={styles.justify}>
            <ImageBackground
              source={require("../assets/note.png")}
              style={styles.note}
            >
              <Text style={[styles.Head1, { color: "#52B848" }]}>
                Get Paid For Playing Educative Games About Money
              </Text>
            </ImageBackground>
          </View>

          <Image
            source={require("../assets/turtle1.png")}
            style={styles.turtle}
          />
          <View style={styles.justify}>
            <ImageBackground
              source={require("../assets/Button.png")}
              style={styles.button}
            >
              <TouchableOpacity
                style={[styles.buttonText]}
                onPress={() => navigation.navigate("SplashScreen2")}
              >
                <Text style={[styles.buttonContent, { color: "white" }]}>
                  Next
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <Image
            source={require("../assets/landscape.png")}
            style={styles.bottombar}
          />
        </View>
      )}
    </View>
  );
};
//on board
//note
//Head1
//turtle
//bottombar
export default SplashScreen;

const styles = StyleSheet.create({
  buttonContent: {
    alignSelf: "center",
    paddingTop: 20,
    fontFamily: "BubblegumSans_400Regular",
    fontSize: 40,
  },
  topbar: {
    height: 555,
    width: win.width,

    borderRadius: 20,
  },
  title: {
    height: 120,
    width: 240,
    marginTop: 400,
    position: "absolute",
    resizeMode: "stretch",
  },
  seen: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
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
