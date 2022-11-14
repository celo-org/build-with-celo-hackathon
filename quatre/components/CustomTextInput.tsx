import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

export type TextInputProps = {
  title: string;
  placeholder: string;
};

const CustomTextInput: React.FC<TextInputProps> = ({ title, placeholder }) => {
  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={{ paddingVertical: 10 }}>
        {title}
        <Text style={{ color: "#F87C00" }}>*</Text>
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: PAGE_WIDTH * 0.9,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <TextInput
          style={{
            height: 50,
            borderColor: "#B1B1B1",
            borderWidth: 1,
            borderRadius: 10,
            flex: 1,
            paddingHorizontal: 10,
          }}
          placeholder={placeholder}
        />
        <View style={{ position: "absolute", right: 10 }}>
          <Entypo name="chevron-small-up" size={24} color="black" />
          <Entypo name="chevron-small-down" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
