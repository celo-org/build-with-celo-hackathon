import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

interface ButtonProps {
  title: string;
  icon?: undefined;
}
const CustomButton: React.FC<ButtonProps> = ({ title, icon }) => {
  return (
    <TouchableOpacity style={[styles.customButton]}>
      <Text style={{ color: "white", fontWeight: "800", fontSize: 12 }}>
        {title}
      </Text>
      <Entypo name={icon} size={24} color="white" />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customButton: {
    width: "40%",
    height: 50,
    backgroundColor: "#F87C00",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
