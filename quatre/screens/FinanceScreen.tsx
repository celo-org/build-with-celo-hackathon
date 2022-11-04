import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import CustomSwitch from "../components/CustomSwitch";
import CustomButton from "../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import PrivateBand from "../components/PrivateBand";
import PublicBand from "../components/PublicBand";
import { useNavigation } from "@react-navigation/native";
import Account from "./Account";
import {  } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
// import { Text, View, TouchableOpacity } from "../components/Themed";
import * as WebBrowser from "expo-web-browser";
import Web3 from "web3";
import Colors from "../constants/Colors";
import { ThemeContext } from "../context/ThemeProvider";

import { digesuAbi, digesuAddress } from "../fetchDeploymentData/digesu";
import { tokenAbi, tokenAddress } from "../fetchDeploymentData/token";
import { accountManagerAddress, accounManagerAbi } from "../fetchDeploymentData/accounManager";
import { apis } from "./apis";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");
const cardWidth: number = PAGE_WIDTH * 0.9;
const cardHeight: number = PAGE_HEIGHT * 0.05;

const slideWidth: number = PAGE_WIDTH * 0.3;
const slideHeight: number = PAGE_HEIGHT * 0.08;

interface FinanceScreenProps {
  value: number;
}

const data = [
  {
    value: 0,
    title: "TOTAL VALUE LOCKED(TVL)",
    source: require("../assets/images/group1.png"),
    col: "#025FCC",
  },
  {
    value: 0,
    title: "CURRENCY",
    source: require("../assets/images/group2.png"),
    col: "#008C06",
  },
  {
    value: 0,
    title: "OPENED BANDS",
    source: require("../assets/images/group3.png"),
    col: "#F87C00",
  },
];

const cardData = [
  {
    initiator: "0xaD...0fe0",
    address: "0xaD...0fe0",
    memberShip: true,
    id: 5,
    contributions: 1,
  },
  {
    initiator: "0xaD...0fe0",
    address: "0xaD...0fe0",
    memberShip: false,
    id: 4,
    contributions: 7,
  },
  {
    initiator: "0xaD...0fe0",
    address: "0xaD...0fe0",
    memberShip: true,
    id: 2,
    contributions: 10,
  },
];

const FinanceScreen = () => {
  const [gamesTab, setGamesTab] = React.useState(1);
  const [paymentOptions, setPaymentOptions] = React.useState(data);
  const [poolData, setPoolData] = React.useState([]); // <================== new add
  const [contributionData, setContributionData] = React.useState(cardData);
  const [bandOptions, setBandOptions] = React.useState(true);
  const [isPrivateBand, setIsPrivateBand] = React.useState(false);
  const [isPublicBand, setIsPublicBand] = React.useState(false);

  const [message, setMessage] = React.useState("");

  const { fetchPoolData } = apis;

  ///////////////////////////////////////////////////////////////////////////////
	const { styles } = useContext(ThemeContext);
	const connector = useWalletConnect();
	const [greeterValue, setGreeterValue] = useState();
	const [greetingInput, setGreetingInput] = useState("");
	const [contractLink, setContractLink] = useState("");
	const [settingGreeting, setSettingPool] = useState(false);
	const [gettingGreeting, setGettingGreeting] = useState(false);

	useEffect(() => {
		if (digesuAddress) {
			setContractLink(
				`https://alfajores-blockscout.celo-testnet.org/address/${digesuAddress}`
			);
		}
	}, [digesuAddress]);

  const navigation = useNavigation();
  const setmessage = (newMessage : string) => { setMessage(newMessage) ;}

  React.useEffect(() => {
    setTimeout( async() => {
      const newPoolData = await fetchPoolData(setmessage, digesuAbi, digesuAddress);
      console.log("New Pool Data", newPoolData);
      if(poolData?.length > 0)  {
        setContributionData(newPoolData);
      } else {
        setContributionData(cardData);
      }
    }, 60000);
  }, [poolData]);

  const onPress = () => {
    navigation.goBack();
  };

  const privateToggle = () => {
    setBandOptions(!bandOptions);
    setIsPrivateBand(true);
  };

  const publicToggle = () => {
    setBandOptions(!bandOptions);
    setIsPublicBand(true);
  };

  const onSelectSwitch = (value: React.SetStateAction<number>) => {
    setGamesTab(value);
  };

  function handlePress() {
		WebBrowser.openBrowserAsync(contractLink);
	}

  return (
    <SafeAreaView style={{ backgroundColor: "#e5e5e5", height: "100%" }}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#E5E5E5",
          paddingBottom: 60,
        }}
      >
        <Header />
        <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <CustomSwitch
            selectionMode={1}
            option1="Create band"
            option2="Open band"
            option3="Closed band"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        {gamesTab === 1 && (
          <View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  marginVertical: 10,
                  lineHeight: 32,
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                Select your preferred band
              </Text>
              {bandOptions && (
                <>
                  <TouchableOpacity
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      backgroundColor: "#EDEDED",
                      marginVertical: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={privateToggle}
                  >
                    <Text
                      style={{
                        color: "#323232",
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      PRIVATE BAND
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      marginVertical: 10,
                      backgroundColor: "#EDEDED",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={publicToggle}
                  >
                    <Text
                      style={{
                        color: "#323232",
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      PUBLIC BAND
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
        {gamesTab === 2 && (
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "600", fontSize: 22, lineHeight: 32 }}>
              Overview
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  Celo Testnet:
                  {/* <Text style={{ color: "blue" }}>0x15366...77599EG</Text> */}
                </Text>
                <Account />  {/* <==================new add ========*/}
                <MaterialCommunityIcons
                  name="content-copy"
                  size={18}
                  color="black"
                />
              </View>
              <CustomButton title="SELECT NETWORK" />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              {paymentOptions.map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: slideWidth,
                    height: slideHeight,
                    backgroundColor: "#FFFFFF",
                    marginVertical: 10,
                    borderRadius: 15,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: item.col,
                        fontWeight: "700",
                        fontSize: 15,
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                      }}
                    >
                      {item.value}
                    </Text>
                    <Text
                      style={{
                        paddingVertical: 20,
                        color: "#B1B1B1",
                        paddingHorizontal: 5,
                        fontWeight: "500",
                        fontSize: 10,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>

                  <View style={{ position: "absolute", bottom: 0, right: 0 }}>
                    <Image
                      source={item.source}
                      style={{ width: 50, height: 50, resizeMode: "cover" }}
                    />
                  </View>
                </View>
              ))}
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 24, lineHeight: 29 }}>
                Activities
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="dots-square"
                  size={30}
                  color="#B1B1B1"
                />
                <FontAwesome5
                  name="grip-lines"
                  size={30}
                  color="#F87C00"
                  style={{ padding: 10 }}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {contributionData.map((card, index) => (
                <View
                  key={index}
                  style={{
                    width: cardWidth,
                    height: PAGE_HEIGHT * 0.4,
                    backgroundColor: "#FFFFFF",
                    marginVertical: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#929191",
                      }}
                    >
                      Type
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#929191",
                      }}
                    >
                      Amount Contributed
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        lineHeight: 32,
                        color: "#323232",
                      }}
                    >
                      PUBLIC
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        lineHeight: 32,
                        color: "#323232",
                      }}
                    >
                      0.998 BNB
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        lineHeight: 32,
                        color: "#323232",
                      }}
                    >
                      Profile
                    </Text>
                    <Feather name="chevron-right" size={24} color="gray" />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#929191",
                      }}
                    >
                      ID
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#323232",
                      }}
                    >
                      {card.id}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#929191",
                      }}
                    >
                      contributions
                    </Text>
                    <Text>{card.contributions}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#929191",
                      }}
                    >
                      Initiator
                    </Text>
                    <Text>
                      {card.initiator}
                      <MaterialCommunityIcons
                        name="content-copy"
                        size={18}
                        color="black"
                      />
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#929191",
                      }}
                    >
                      Address
                    </Text>
                    <Text>
                      {card.address}
                      <MaterialCommunityIcons
                        name="content-copy"
                        size={18}
                        color="black"
                      />
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#929191",
                      }}
                    >
                      Current Fill
                    </Text>
                    <Text>
                      Current Fill
                      <MaterialCommunityIcons
                        name="content-copy"
                        size={18}
                        color="black"
                      />
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#929191",
                      }}
                    >
                      Membership
                    </Text>
                    <Text>
                      {card.memberShip === true
                        ? `✅ Member`
                        : ` ❌ Non-member`}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 1,
                      width: PAGE_WIDTH * 0.8,
                      backgroundColor: "#B1B1B1",
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        lineHeight: 32,
                        color: "#929191",
                      }}
                    >
                      Make Contribution
                    </Text>
                    <CustomButton title="Join" />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {gamesTab === 3 && (
          <View
            style={{
              marginVertical: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/images/Closed.png")}
              style={{ height: 200, width: 200, resizeMode: "cover" }}
            />
          </View>
        )}

        {isPrivateBand && (
          <>
            <PrivateBand
              onPress={() => {
                {
                  onPress;
                }
                setIsPrivateBand(!isPrivateBand);
                setBandOptions(!bandOptions);
              }}
            />
          </>
        )}

        {isPublicBand && (
          <>
            <PublicBand
              onPress={() => {
                {
                  onPress;
                }
                setIsPublicBand(!isPublicBand);
                setBandOptions(!bandOptions);
              }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FinanceScreen;

const styles = StyleSheet.create({});
