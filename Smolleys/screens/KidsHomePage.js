import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import BottomNav from "../components/bottomNav";
import IslandComponent from "../components/island";
import TopBar from "../components/topBar";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const win = Dimensions.get("window");

const KidsHomePage = ({ navigation }) => {
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
        console.log("snap", snp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ImageBackground
      style={styles.bg}
      source={require("../assets/mini-component-assets/water.png")}
    >
      <TopBar navigation={navigation} />
      <ScrollView
        ref={scrollViewRef}
        onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        contentContainerStyle={styles.direction}
      >
        {taskKeys.map((key, index) => (
          <IslandComponent
            key={key}
            navigation={navigation}
            value={tasks[key]}
            id={snnap[key]}
            position={index + 1}
          />
        ))}
      </ScrollView>
      <BottomNav navigation={navigation} />
    </ImageBackground>
  );
};

export default KidsHomePage;

const styles = StyleSheet.create({
  bg: {
    height: win.height + 40,
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
