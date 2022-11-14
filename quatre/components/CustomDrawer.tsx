import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ScrollViewProps,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Switch, useTheme, Drawer, TouchableRipple } from "react-native-paper";
import { AuthContext } from "./context";

const CustomDrawer = (props: JSX.IntrinsicAttributes & ScrollViewProps & { children: React.ReactNode; } & React.RefAttributes<ScrollView>) => {
  const navigation = useNavigation();

  const paperTheme = useTheme();

  const { toggleTheme } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#FFFFFF" }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{ height: 80, width: 80, resizeMode: "contain" }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "lightgray",
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="close" size={24} color="#F87C00" />
          </TouchableOpacity>
        </View>

        <Drawer.Section title="Preferences">
          <TouchableRipple
            onPress={() => {
              toggleTheme();
            }}
          >
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={paperTheme.dark} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>

        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop: 10,
            marginTop: 40,
          }}
        >
          {/* <DrawerItemList {...props} /> */}
          {/* Docs section */}
          <Drawer.Section title="Read Docs">
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#FFEFE0",
                height: 40,
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() => navigation.navigate("SpeedDoc")}
            >
              <View
                style={{
                  width: 20,
                  height: 70,
                  backgroundColor: "#F87C00",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  marginRight: 15,
                }}
              />
              <FontAwesome5 name="book-open" size={24} color="#F87C00" />
              <Text
                style={{
                  fontWeight: "600",
                  color: "#F87C00",
                  lineHeight: 24,
                  marginLeft: 15,
                  fontSize: 16,
                }}
              >
                Speed Docs
              </Text>
            </TouchableOpacity>
          </Drawer.Section>
          {/* menu section */}
          <Drawer.Section title="Menu" style={{ marginTop: 20 }}>
            <TouchableRipple
              onPress={() => {
                navigation.navigate("MainPage");
              }}
            >
              <View style={styles.preference}>
                <Text
                  style={{ color: "#F87C00", fontSize: 16, fontWeight: "600" }}
                >
                  Home
                </Text>
                <View pointerEvents="none">
                  <FontAwesome5 name="home" size={24} color="#F87C00" />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
