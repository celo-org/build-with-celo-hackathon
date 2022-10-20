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
const AddChild = () => {
  let [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.onboard}>
      <Text style={styles.heading}>Add Your Child's</Text>
      <Text style={styles.heading}>account</Text>
      <TouchableOpacity>
        <ImageBackground
          source={require("../assets/Button.png")}
          style={styles.button}
        >
          <Text style={[styles.buttonContent, { color: "white" }]}>Next</Text>
        </ImageBackground>
      </TouchableOpacity>
      <Image
        source={require("../assets/landscape.png")}
        style={styles.footer}
      />
    </View>
  );
};

export default AddChild;

const styles = StyleSheet.create({
  onboard: {
    alignItems: "center",
    marginTop: 150,
  },
  heading: {
    fontFamily: "BubblegumSans_400Regular",
    color: "#52B848",
    alignItems: "center",
    fontSize: 46,
    marginLeft: 40,
    marginRight: 40,
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
    marginTop: 150,
  },
});
