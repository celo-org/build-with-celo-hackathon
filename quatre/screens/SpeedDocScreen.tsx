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

const SpeedDocScreen = () => {
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
            {" "}
            TESTNET INFO
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
            This is a Beta version, token used does not have real value. Do not
            use real network asset such as BNB. Be sure you're on testnet before
            carrying out any transaction. You may experience inconsistencies.
            Your feedbacks matter to us.
          </Text>
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
            {" "}
            Support
          </Text>
        </View>

        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              lineHeight: 32,
              color: "#F87C00",
            }}
          >
            t.me/quatrefinance
          </Text>
        </View>

        <View style={{ alignItems: "flex-end", marginRight: 20 }}>
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
            <Text>Next</Text>
            <Text style={{ color: "#F87C00", fontSize: 12, fontWeight: "300" }}>
              What is a Digesu?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpeedDocScreen;

const styles = StyleSheet.create({});