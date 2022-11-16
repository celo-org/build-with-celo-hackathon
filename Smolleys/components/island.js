import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useState } from "react";
import {
  useFonts,
  BubblegumSans_400Regular,
} from "@expo-google-fonts/bubblegum-sans";

const win = Dimensions.get("window");

const IslandComponent = ({
  position,
  navigation,
  id,
  value: { emoji, name, isDone },
}) => {
  const [open, setOpen] = useState(false);
  let [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  // console.log(position);

  function getCandy(position) {
    if (position == 1)
      return require("../assets/mini-component-assets/candy1.png");
    if (position == 2)
      return require("../assets/mini-component-assets/candy2.png");
    if (position == 3)
      return require("../assets/mini-component-assets/candy3.png");
    if (position == 4)
      return require("../assets/mini-component-assets/candy4.png");
    if (position == 5)
      return require("../assets/mini-component-assets/candy5.png");
    if (position > 5)
      return require("../assets/mini-component-assets/candy1.png");
  }
  console.log(id);
  function getImage(position) {
    if (position == 1)
      return require("../assets/mini-component-assets/island1.png");
    if (position == 2)
      return require("../assets/mini-component-assets/island2.png");
    if (position == 3)
      return require("../assets/mini-component-assets/island3.png");
    if (position == 4)
      return require("../assets/mini-component-assets/island4.png");
    if (position == 5)
      return require("../assets/mini-component-assets/island5.png");
    if (position > 5)
      return require("../assets/mini-component-assets/island1.png");
  }
  return (
    <View>
      {/* Island Popup */}
      <ImageBackground
        style={[
          open ? null : styles.hide,
          styles.islandPop,
          position == 7
            ? styles.islandCenter
            : position % 2 == 0
            ? styles.islandLeft
            : styles.islandRight,
        ]}
        source={require("../assets/mini-component-assets/moneyButton.png")}
      >
        <Text style={styles.emoji}>{isDone ? "✔️" : emoji}</Text>
        <Text style={[styles.todoText, { color: "green" }]}>{name}</Text>
        <TouchableOpacity
          onPress={
            isDone
              ? () => navigation.navigate("ClaimReward", { taskId: id })
              : () => navigation.navigate("CameraScreen", { taskId: id })
          }
        >
          <ImageBackground
            source={require("../assets/mini-component-assets/blueButton.png")}
            style={styles.button}
          >
            <Text style={styles.todoText}>
              {isDone ? "Claim Reward" : "Complete Task"}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ImageBackground>

      {/* Island */}
      <View style={{ position: "relative" }}></View>
      <TouchableOpacity
        style={[{ zIndex: 8, elevation: 8 }, { opacity: isDone ? 0.4 : 1 }]}
        disabled={isDone}
        onPress={() => setOpen(!open)}
      >
        <Image
          source={getCandy(position)}
          style={[
            // position == 7 ? styles.island7 : styles.island,
            position == 5
              ? styles.candyCenter
              : position == 4
              ? styles.candy4
              : position % 2 == 0
              ? styles.candyLeft
              : styles.candyRight,
          ]}
        />
      </TouchableOpacity>
      <Image
        source={getImage(position)}
        style={[
          position == 5 ? styles.island7 : styles.island,
          position == 7
            ? styles.islandCenter
            : position % 2 == 0
            ? styles.islandLeft
            : styles.islandRight,

          { opacity: isDone ? 0.4 : 1 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  islandPop: {
    position: "absolute",
    top: -220,
    left: 20,
    elevation: 10,
    zIndex: 10,
    width: 270,
    margin: 10,
    resizeMode: "contain",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  island: {
    height: 200,
    marginTop: -20,
  },
  island7: {
    marginTop: 150,
    height: 310,
    // width: 310,
    // marginTop: -20,
  },
  islandLeft: {
    alignSelf: "flex-end",
  },
  islandRight: {
    alignSelf: "flex-start",
  },
  islandCenter: {
    alignSelf: "center",
  },
  candyLeft: {
    position: "absolute",
    elevation: 4,
    zIndex: 4,
    top: 0,
    right: 100,
  },
  candy4: {
    width: 65,
    height: 65,
    position: "absolute",
    elevation: 4,
    zIndex: 4,
    top: 0,
    left: 100,
  },
  candyRight: {
    alignSelf: "flex-start",
    elevation: 4,
    zIndex: 4,
    marginLeft: 25,
    marginBottom: -65,
  },
  candyCenter: {
    position: "absolute",
    top: 180,
    left: 140,
    elevation: 8,
    zIndex: 8,
  },
  emoji: {
    fontSize: 70,
  },
  todoText: {
    fontSize: 20,
    color: "white",
    fontFamily: "BubblegumSans_400Regular",
  },
  hide: {
    display: "none",
  },
  button: {
    height: 70,
    padding: 10,
    marginBottom: -40,
    elevation: 5,
    width: win.width - 192,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IslandComponent;
