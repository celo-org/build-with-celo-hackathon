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

const PageTwoScreen = () => {
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
            WHAT IS A DIGESU
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
            A collection of communities that have come together to support one
            another by contributing certain amount, total of which is given to
            the each member for use rotationally usually for a short period of
            time. Such period cannot be greater than 255 days. The beneficiairy
            makes use of the fund for the set period o f time and return it to
            the pool. This is system known mostly with the Africans and we have
            redefined it to be accessible to anyone anywhere around the world.
            Seen a method of raising funds among the Africans where two or more
            people come together to support one another in raising fund for a
            particular endeavour or project usually in a small or medium way.
            Often, it is in rotational order without charging any form of
            interest. There are couple of setbacks associated with this method
            such as lack of trust, dubious action where one person refuses to
            pay back and much more. Using blockchain potentials and strategies,
            we provide solutions while digitalizing this culture. With Digesu,
            users have more than one option and designs. Let's t ake a scenario
            where Bob, Alice and Kate decide to fund one a nother using Digesu
            with each depositing 3BNB. Firstly the trust aspect is removed when
            you make the choice to subscribe to Digesu. Bob, decide to launch a
            band on Digesu in a strict mode which only Alice and Kate can join
            thereafter. At this point, we have a quorum of 3 and total BNB in
            the band accou nt will be 9. Based on the algorithm we used, the
            first to come is the first to be served. Bob will then proceed to
            get financed with an amount of 9BNB. He is required to have an
            equivalent amount of QFTs in his wallet before the fund can b e
            released to him. If Bob had set up the band with a multiplier of say
            1.5 (that is, collateral index) then Bob will have QFT amount of
            9BNB x 1.5 in his wallet. This pattern con tinues until a cycle is
            completed. It is largely user-controlled and simply a collection of
            many bands. This is only a part of the plan. Digesu has different
            categories. On the second catgery, starting from Nigeria with over
            200Million population, our target is a fraction of the to al
            population who make at least a penny daily but keep them idle either
            in the bank or somewhere with the man who comes to take them
            everyday without yeilding interest..
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 30,
            paddingBottom: 60,
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
            onPress={() => navigation.navigate("SpeedDoc")}
          >
            <Text>Previous</Text>
            <Text style={{ color: "#F87C00", fontSize: 12, fontWeight: "300" }}>
              TestNet Info
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
            onPress={() => navigation.navigate("PageThree")}
          >
            <Text>Next</Text>
            <Text style={{ color: "#F87C00", fontSize: 12, fontWeight: "300" }}>
              Things you should know about digesu
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageTwoScreen;

const styles = StyleSheet.create({});
