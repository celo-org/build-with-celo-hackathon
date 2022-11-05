import { Feather } from "@expo/vector-icons";
import { Video } from "expo-av";
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { fetchUserPosts, sendNotification } from "../../../redux/actions/index";
import { container, navbar, text, utils } from "../components/styles";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

function SaveScreen(props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  const uploadImage = async () => {
    if (uploading) {
      return;
    }
    setUploading(true);
    let downloadURLStill = null;
    let downloadURL = await SaveStorage(
      props.route.params.source,
      `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    );

    if (props.route.params.imageSource != null) {
      downloadURLStill = await SaveStorage(
        props.route.params.imageSource,
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
      );
    }

    savePostData(downloadURL, downloadURLStill);
  };

  const SaveStorage = async (image, path) => {
    if (image == "default") {
      return "";
    }

    const fileRef = firebase.storage().ref().child(path);

    const response = await fetch(image);
    const blob = await response.blob();

    const task = await fileRef.put(blob);

    const downloadURL = await task.ref.getDownloadURL();

    return downloadURL;
  };

  const savePostData = (downloadURL, downloadURLStill) => {
    let object = {
      downloadURL,
      likesCount: 0,
      downloadURLStill,
      commentsCount: 0,
      type: props.route.params.type,
      creation: firebase.firestore.FieldValue.serverTimestamp(),
    };

    if (downloadURLStill != null) {
      object.downloadURLStill = downloadURLStill;
    }

    firebase
      .firestore()
      .collection("post")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add(object)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
        setError(true);
      });
    console.log();
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("tasks")
      .doc(props.route.params.taskId)
      .update({
        isDone: true,
      });

    props.navigation.navigate("KidsHomePage");
  };

  return (
    <View style={[container.container, utils.backgroundWhite]}>
      {uploading ? (
        <View
          style={[
            container.container,
            utils.justifyCenter,
            utils.alignItemsCenter,
          ]}
        >
          <ActivityIndicator style={utils.marginBottom} size="large" />
          <Text style={[text.bold, text.large]}>Upload in progress...</Text>
        </View>
      ) : (
        <View style={[container.container]}>
          <View
            style={[
              container.container,
              utils.backgroundWhite,
              utils.padding15,
            ]}
          >
            <View>
              {props.route.params.type ? (
                <Image
                  source={{ uri: props.route.params.source }}
                  style={[
                    { aspectRatio: 1 / 1, backgroundColor: "black" },
                    container.image,
                  ]}
                />
              ) : (
                <Video
                  source={{ uri: props.route.params.source }}
                  shouldPlay={true}
                  isLooping={true}
                  resizeMode="cover"
                  style={{ aspectRatio: 1 / 1, backgroundColor: "black" }}
                />
              )}
              <Feather
                style={navbar.image}
                name="check"
                size={24}
                color="green"
                onPress={() => {
                  uploadImage();
                }}
              />
            </View>
          </View>
          <Snackbar
            visible={error}
            duration={2000}
            onDismiss={() => setError(false)}
          >
            Something Went Wrong!
          </Snackbar>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: "flex-end",
    paddingTop: 100,
  },
  suggestionsRowContainer: {
    flexDirection: "row",
  },
  userAvatarBox: {
    width: 35,
    paddingTop: 2,
  },
  userIconBox: {
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#54c19c",
  },
  usernameInitials: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
  userDetailsBox: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 15,
  },
  displayNameText: {
    fontSize: 13,
    fontWeight: "500",
  },
  usernameText: {
    fontSize: 12,
    color: "rgba(0,0,0,0.6)",
  },
});

export default SaveScreen;
