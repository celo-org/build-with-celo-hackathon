import { useRef, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomNav from "../components/bottomNav";
import IslandComponent from "../components/island";
import TopBar from "../components/topBar";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const win = Dimensions.get("window");

const Rewards = ({ navigation }) => {
  const isFocused = useIsFocused();
  const scrollViewRef = useRef();
  var snp = {};
  const [tasks, setTasks] = useState({});
  const [snnap, setSnnap] = useState({});
  const [tmp, setTmp] = useState({});
  const taskKeys = Object.keys(tasks);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("tasks")
      .orderBy("creation", "asc")
      .get()
      .then((snap) => {
        // snp = snap.docs[0].id;
        const items = {};
        var i = 0;
        snap.forEach(fetchTasks);
        function fetchTasks(item) {
          items[item.id] = item.data();
          snp[item.id] = snap.docs[i].id;
          i++;
        }
        setTasks(items);
        setSnnap(snp);
        console.log(snp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isFocused]);

  return (
    <ImageBackground
      style={styles.bg}
      source={require("../assets/mini-component-assets/OrangeBg.png")}
    >
      <View>
        <Image
          style={{ margin: 20 }}
          source={require("../assets/mini-component-assets/back.png")}
        />
      </View>
      <View
        style={[
          {
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            color: "green",
          },
        ]}
      >
        <Text style={[styles.todoText, { color: "green", fontSize: 30 }]}>
          <>Rewards</>
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: win.height / 1.5,
        }}
      >
        <ImageBackground
          style={[styles.islandPop]}
          source={require("../assets/mini-component-assets/moneyButton.png")}
        >
          <Image
            source={require("../assets/mini-component-assets/moneyBig.png")}
          />
          <Text style={[styles.todoText, { color: "green" }]}>cUSD</Text>
          <View style={{ marginTop: 15 }}></View>
          <Text style={[styles.todoText, { color: "green" }]}>
            Total Balance: $40
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Rewards", { taskId: id })}
          >
            <ImageBackground
              source={require("../assets/mini-component-assets/blueButton.png")}
              style={styles.button}
            >
              <Text style={styles.todoText}>Claim</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
        <Text style={[styles.todoText, { color: "green", fontSize: 30 }]}>
          <>Rewards</>
        </Text>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </ImageBackground>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  bg: {
    height: win.height + 40,
    flexDirection: "column",
  },
  button: {
    height: 70,
    padding: 10,
    marginBottom: 0,
    elevation: 11,
    zIndex: 11,
    width: win.width - 192,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
  },
  islandPop: {
    // position: "absolute",
    // top: win.height / 3,
    //left: win.width / 10,
    elevation: 10,
    zIndex: 10,
    width: 270,
    margin: 10,
    // resizeMode: "contain",
    height: 210,
    justifyContent: "center",
    alignItems: "center",
  },
  todoText: {
    fontSize: 20,
    color: "white",
    fontFamily: "BubblegumSans_400Regular",
  },
  direction: {
    // flexDirection: "column-reverse",

    height: win.height + 800,
    // paddingBottom: 200,
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
    // paddingBottom: win.height / 6,
  },
});
