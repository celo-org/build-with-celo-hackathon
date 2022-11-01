import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomNav from "../components/bottomNav";
import Timeline from "../components/timeline";
const win = Dimensions.get("window");

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const TimelineScreen = ({ navigation }) => {
  const [posts, setPosts] = useState({});
  const postKeys = Object.keys(posts);

  useEffect(() => {
    firebase
      .firestore()
      .collection("post")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "desc")
      .get()
      .then((snap) => {
        const items = {};
        snap.forEach((item) => {
          items[item.id] = item.data();
        });
        setPosts(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.bg}>
      <Image
        style={[styles.bar, styles.barPosition, styles.float]}
        source={require("../assets/mini-component-assets/profilexl.png")}
      />
      <ScrollView>
        <View style={styles.pdg}>
          {postKeys.length > 0 ? (
            postKeys.map((key) => (
              <Timeline
                key={key}
                id={key}
                value={posts[key]}
                name="Edidiong Udoh"
                src={posts[key].downloadURL}
              />
            ))
          ) : (
            <Text>No Post Yet</Text>
          )}
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};
export default TimelineScreen;

const styles = StyleSheet.create({
  bg: {
    height: win.height + 40,
  },
  pdg: {
    paddingTop: 80,
  },
  barPosition: {
    top: 20,
    right: 20,
  },
  bar: {
    // width: win.width,
    height: 80,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  float: {
    position: "absolute",
    elevation: 6,
    zIndex: 6,
  },
});
