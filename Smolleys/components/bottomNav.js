import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
const win = Dimensions.get("window");

const BottomNav = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <ImageBackground
        style={[
          styles.bar,
          styles.float,
          styles.barPosition,
          open ? null : styles.hide,
        ]}
        source={require("../assets/mini-component-assets/bottomBar.png")}
      >
        <View style={styles.flex}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TimelineScreen")}
          >
            <Image
              source={require("../assets/mini-component-assets/homeButton.png")}
            />
          </TouchableOpacity>
          <Image
            source={require("../assets/mini-component-assets/rgfgfs.png")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("KidsHomePage")}>
            <Image
              source={require("../assets/mini-component-assets/play.png")}
            />
          </TouchableOpacity>
          <Image
            source={require("../assets/mini-component-assets/calculator.png")}
          />
          <Image
            source={require("../assets/mini-component-assets/profile.png")}
          />
        </View>
      </ImageBackground>

      {/* FAB */}
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Image
          style={[styles.float, styles.morePosition]}
          source={require("../assets/mini-component-assets/plusButton.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
export default BottomNav;

const styles = StyleSheet.create({
  hide: {
    display: "none",
  },
  float: {
    position: "absolute",
  },
  morePosition: {
    width: 90,
    bottom: 80,
    right: -23,
  },
  barPosition: {
    bottom: 0,
  },
  bar: {
    width: win.width - 10,
    height: 70,
    marginBottom: 10,
    alignSelf: "center",
  },
  flex: {
    flexDirection: "row",
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
