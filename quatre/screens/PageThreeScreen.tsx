import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import DropDown from "../components/DropDown";

const PageThreeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              lineHeight: 32,
              color: "#F87C00",
            }}
          >
            Speed Doc
          </Text>
        </View>

        <View>
          <DropDown />
        </View>

        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              lineHeight: 32,
              color: "#323232",
            }}
          >
            THINGS YOU SHOULD KNOW ABOUT DIGESU
          </Text>
        </View>

        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              lineHeight: 32,
              color: "#323232",
            }}
          >
            You cannot create a new band with an existing amount unless the
            Quorum for the selected amount is reached. That is, if a band
            already has an amount of 1BNB and it is still active, no band with
            same amount can exist simultaneously unless the existing band is
            filled up. This is to achieve efficiency and moderation. There is a
            limit to the number of bands you can join. You cannot create a band
            with duration (in days) above 255 days. Setting APR below 100 will
            cause unexpected behavior. 100 mean no interest should be charged in
            this band. 120 means to set interest rate to 20% per annum. Same
            rule for APR applies to multiplier (i.e. collateral factor).
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 170,
              height: 70,
              borderWidth: 1,
              borderColor: "#B1B1B1",
              alignItems: "flex-end",
              justifyContent: "space-around",
              paddingHorizontal: 10,
            }}
            onPress={() => navigation.navigate("PageTwo")}
          >
            <Text>Previous</Text>
            <Text style={{ color: "#F87C00", fontSize: 12, fontWeight: "300" }}>
              What is a Digesu?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 170,
              height: 70,
              borderWidth: 1,
              borderColor: "#B1B1B1",
              alignItems: "flex-end",
              justifyContent: "space-around",
              paddingHorizontal: 10,
            }}
            onPress={() => navigation.navigate("PageFour")}
          >
            <Text>Next</Text>
            <Text style={{ color: "#F87C00", fontSize: 12, fontWeight: "300" }}>
              How is a digesu different from other platform?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageThreeScreen;

const styles = StyleSheet.create({});
