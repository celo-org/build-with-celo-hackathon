import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DropDown = () => {
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: "SpeedDoc", value: "TestNet Info" },
    { label: "PageTwo", value: "What is a Digesu?" },
    { label: "PageThree", value: "Things you should know about digesu" },
    {
      label: "PageFour",
      value: "How is a digesu different from other platform?",
    },
    { label: "PageFive", value: "What is a Band?" },
    { label: "PageSix", value: "Steps in a Band" },
    { label: "PageSeven", value: "Quorum" },
    { label: "PageEight", value: "Amount" },
    { label: "PageNine", value: "Duration" },
    { label: "PageTen", value: "Multiplier" },
    { label: "PageEleven", value: "Liquidation" },
    { label: "PageTwelve", value: "Public vs Private Bands" },
    { label: "PageThirteen", value: "What is a cycle?" },
    { label: "PageFourteen", value: "What is a Quatrefinance?" },
    { label: "PageFifteen", value: "How to get Finance" },
    { label: "PageSixteen", value: "How to Pay back" },
    { label: "PageSeventeen", value: "Claim Dues" },
  ]);

  const renderLabel = () => {
    if (value || open) {
      return (
        <Text style={[styles.label, open && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, open && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        maxHeight={300}
        labelField="value"
        valueField="label"
        placeholder={!open ? "Jump To:" : "..."}
        searchPlaceholder="Search..."
        value={value}
        iconColor="#F87C00"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={(item) => {
          setValue(item.value);
          navigation.navigate(item.label);
          setOpen(false);
        }}
        // renderLeftIcon={() => (
        //   <Entypo name="chevron-down" size={24} color="#F87C00" />
        // )}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 30,
    height: 30,
    backgroundColor: "#Fff",
    borderRadius: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
