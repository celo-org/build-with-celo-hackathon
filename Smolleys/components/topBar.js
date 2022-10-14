import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import {
  useFonts,
  BubblegumSans_400Regular,
} from "@expo-google-fonts/bubblegum-sans";
const win = Dimensions.get("window");

const TopBar = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <ImageBackground
        style={[styles.bar, styles.barPosition, styles.float]}
        source={require("../assets/mini-component-assets/topBarBg.png")}
      >
        {/* Stars */}
        <ImageBackground
          style={styles.defSize}
          source={require("../assets/mini-component-assets/tasksButton.png")}
        >
          <Text style={styles.defText}>1/5</Text>
        </ImageBackground>

        <View>
          <View style={styles.flex}>
            <Image
              source={require("../assets/mini-component-assets/leftButton.png")}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Rewards")}>
              <Image
                source={require("../assets/mini-component-assets/money.png")}
              />
            </TouchableOpacity>

            <Image
              source={require("../assets/mini-component-assets/rightButton.png")}
            />
          </View>
          <View>
            {/* Balance */}
            <ImageBackground
              style={styles.minDefSize}
              source={require("../assets/mini-component-assets/moneyBalance.png")}
            >
              <Text style={styles.spDefText}>0.025 cUSD</Text>
            </ImageBackground>
          </View>
        </View>

        <ImageBackground
          style={styles.defSize}
          source={require("../assets/mini-component-assets/additionalTasksButton.png")}
        >
          <Text style={styles.defText}>3/5</Text>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};
export default TopBar;

const styles = StyleSheet.create({
  barPosition: {
    top: 0,
  },
  minDefSize: {
    height: 40,
    width: 90,
    paddingTop: 15,
    paddingLeft: 20,
    alignSelf: "center",
  },
  defSize: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 20,
    height: 40,
    width: 90,
  },
  bar: {
    width: win.width,
    height: 110,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "center",
  },
  float: {
    position: "absolute",
    elevation: 6,
    zIndex: 6,
  },
  flex: {
    flexDirection: "row",
  },
  defText: {
    fontSize: 10,
    color: "green",
    marginRight: 20,
    fontFamily: "BubblegumSans_400Regular",
  },
  spDefText: {
    fontSize: 10,
    color: "green",
    marginRight: 10,
    paddingRight: 10,
    fontFamily: "BubblegumSans_400Regular",
  },
});
