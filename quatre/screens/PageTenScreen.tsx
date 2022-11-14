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

const PageTenScreen = () => {
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
            MULTIPLIER
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
            A band with 1.5x multiplier requires the current GF'er to deposit
            collateral in a function of 1.5 times the pooled amount i.e If
            multiplier is 1, then coll teral is not needed. Example: Assume Unit
            amount = 1 ETH, quorum = 3 and mult iplier = 1.5, collateral value
            will be 1ETH * 3 * 1.5 = 4.5ETH. Collateral are denominated in QFT
            or stableCoin.
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
            onPress={() => navigation.navigate("PageNine")}
          >
            <Text>Previous</Text>
            <Text style={{ color: "#F87C00", fontSize: 12, fontWeight: "300" }}>
              Duration
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
            onPress={() => navigation.navigate("PageEleven")}
          >
            <Text>Next</Text>
            <Text style={{ color: "#F87C00", fontSize: 12, fontWeight: "300" }}>
              Liquidation
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageTenScreen;

const styles = StyleSheet.create({});
