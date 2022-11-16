import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import React, { Component } from "react";
const win = Dimensions.get("window");

const Timeline = ({ src, name, value: { downloadURL } }) => {
  // console.log(downloadURL.toString());
  console.log(src);
  return (
    <View style={styles.defSize}>
      <View>
        <View style={styles.flex}>
          <Text>{name}</Text>
          <Text>FOLLOW</Text>
        </View>
      </View>
      <ImageBackground
        source={require("../assets/note.png")}
        style={styles.note}
      >
        <Image source={{ uri: src }} style={styles.imgSize} />
      </ImageBackground>

      <ImageBackground
        style={[styles.box, styles.flex]}
        source={require("../assets/mini-component-assets/timelineBox.png")}
      >
        <Image
          source={require("../assets/mini-component-assets/likeButton.png")}
        />
        <Image
          source={require("../assets/mini-component-assets/commentButton.png")}
        />
      </ImageBackground>
    </View>
  );
};
export default Timeline;

const styles = StyleSheet.create({
  note: {
    height: 200,
    width: win.width,
    marginBottom: 0,
  },
  imgSize: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
    zIndex: 5,
    elevation: 5,
  },
  defSize: {
    justifyContent: "center",
    alignSelf: "center",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  box: {
    height: 70,
    resizeMode: "contain",
    alignSelf: "center",
    width: win.width - 130,
    marginBottom: 60,
  },
});
