import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginVertical: 20,
      }}
    >
      <Feather name="menu" size={24} color="black" />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          width: "70%",
          borderRadius: 10,
        }}
      >
        <TextInput
          placeholder="Search"
          style={{
            borderWidth: 1,
            borderColor: "#B1B1B1",
            flex: 1,
            padding: 10,
          }}
        />

        <View style={{ padding: 4, backgroundColor: "#F87C00" }}>
          <Feather name="search" size={24} color="white" />
        </View>
      </View>
      <View style={{ backgroundColor: "white", padding: 2, borderRadius: 10 }}>
        <Ionicons name="ios-notifications-outline" size={24} color="black" />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  dot: {
    width: 7,
    height: 7,
    margin: 1,
    borderRadius: 15,
    backgroundColor: "#F87C00",
    position: "absolute",
    top: 4,
    right: 5,
  },
});
