import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";

export type PublicBandProps = {
  onPress: () => any;
};

const PublicBand: React.FC<PublicBandProps> = ({ onPress }) => {
  return (
    <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={{ position: "absolute", right: 200 }}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text>Public Band</Text>
      </View>

      <CustomTextInput
        title="Number of members"
        placeholder="How many members do you expect?"
      />

      <CustomTextInput
        title="Unit contribution"
        placeholder="Enter the unit contribution"
      />

      <CustomTextInput
        title="Duration(in days)"
        placeholder="Enter the duration"
      />

      <CustomTextInput
        title="Collateral multiplier"
        placeholder="Enter the collateral multiplier"
      />

      <View style={{ marginTop: 60 }} />
      <CustomButton title="Transact" />
    </View>
  );
};

export default PublicBand;

const styles = StyleSheet.create({});
