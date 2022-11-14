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

const PageFourScreen = () => {
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
            HOW IS A DIGESU DIFFERENT FROM OTHER PLATFORM?
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
            (a). It is 100% controlled by user. (b). Quatrefinance does not hold
            any fund in custody. (c). It if flexible: that is, (i). use may
            create a band of many friends (i.e restricted band, with
            participants not greater than 255) and rotate pooled fund among
            participants until the cycle is completed or join an existing band.
            (ii). Setting collateral (i.e multiplier) is optional. (iii).
            Settings such as collateral factor, are determined by user. (d). It
            is highly decentralised. (e). Every participant in a band is a
            borrower and a lender at the same time. (f). Collateral is optional
            (g). Users earn from the platform. No interest is charged
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
            onPress={() => navigation.navigate("PageThree")}
          >
            <Text>Previous</Text>
            <Text style={{ color: "#F87C00", fontSize: 12, fontWeight: "300" }}>
              Things you should know about digesu
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
            onPress={() => navigation.navigate("PageFive")}
          >
            <Text>Next</Text>
            <Text style={{ color: "#F87C00", fontSize: 12, fontWeight: "300" }}>
              What is a Band?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageFourScreen;

const styles = StyleSheet.create({});
