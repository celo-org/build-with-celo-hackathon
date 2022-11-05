import React from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import {
  BubblegumSans_400Regular,
  useFonts,
} from "@expo-google-fonts/bubblegum-sans";
import { Controller, useForm } from "react-hook-form";

const SignupParent = ({ navigation }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  const onSubmit = (formData) => {
    // Start Code
    const { email, password, name, phone, country } = formData;

    if (password.length < 6) {
      Alert.alert("Error", "passwords must be at least 6 characters", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        if (!snapshot.exist) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                  name,
                  email,
                  image: "default",
                  phone,
                  country,
                  followingCount: 0,
                  followersCount: 0,
                });
              navigation.navigate("AccountSuccess");
              return;
            })
            .catch((e) => {
              navigation.navigate("AccountSuccess");
            });
        } else {
          Alert.alert("Email already taken");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // new end
    console.log(formData);
  };

  let [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.field}>
      {/* <TextInput
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="Email"
        onChangeText={onChangeField("email")}
      />
      <TextInput
        secureTextEntry
        autoCompleteType="password"
        placeholder="Password"
        onChangeText={onChangeField("password")}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}

      <ImageBackground
        source={require("../assets/Green.png")}
        style={styles.note}
      >
        <Text style={styles.title}>CREATE ACCOUNT</Text>
        <Text style={styles.subtitle}>Name</Text>
        <ImageBackground
          source={require("../assets/textbox.png")}
          style={styles.input}
        >
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                textContentType="name"
                placeholder="name"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                style={{
                  fontFamily: "BubblegumSans_400Regular",
                  color: "white",
                }}
              />
            )}
            rules={{ required: "Name is required" }}
          />
          <Text style={{ color: "red", fontSize: 10 }}>
            {errors.name && errors.name.message}
          </Text>
        </ImageBackground>
        <Text style={styles.subtitle}>Email</Text>
        <ImageBackground
          source={require("../assets/textbox.png")}
          style={styles.input}
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                style={{
                  fontFamily: "BubblegumSans_400Regular",
                  color: "white",
                }}
              />
            )}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "A valid email is required",
              },
            }}
          ></Controller>
          <Text style={{ color: "red" }}>
            {errors.email && errors.email.message}
          </Text>
        </ImageBackground>
        <Text style={styles.subtitle}>Phone No.</Text>
        <ImageBackground
          source={require("../assets/textbox.png")}
          style={styles.input}
        >
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <TextInput
                  keyboardType="numeric"
                  placeholder="Phone number"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  style={{
                    fontFamily: "BubblegumSans_400Regular",
                    color: "white",
                  }}
                />
              );
            }}
            rules={{ required: "Phone is required" }}
          ></Controller>
        </ImageBackground>
        <Text style={styles.subtitle}>Country of Residence</Text>
        <ImageBackground
          source={require("../assets/textbox.png")}
          style={styles.input}
        >
          <Controller
            control={control}
            name="country"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                textContentType="country"
                placeholder="Country"
                onChangeText={onChange}
                value={value}
                style={{
                  fontFamily: "BubblegumSans_400Regular",
                  color: "white",
                }}
              />
            )}
            rules={{ required: "Country is required" }}
          ></Controller>
        </ImageBackground>
        <Text style={styles.subtitle}>Password</Text>
        <ImageBackground
          source={require("../assets/textbox.png")}
          style={styles.input}
        >
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                secureTextEntry
                autoCompleteType="password"
                placeholder="Password"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                style={{
                  fontFamily: "BubblegumSans_400Regular",
                  color: "white",
                }}
              />
            )}
            rules={{ required: "Password is required" }}
          ></Controller>
        </ImageBackground>
        <Text style={styles.subtitle}>Confirm Password</Text>
        <ImageBackground
          source={require("../assets/textbox.png")}
          style={styles.input}
        >
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                secureTextEntry
                autoCompleteType="password"
                placeholder="Password"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                style={{
                  fontFamily: "BubblegumSans_400Regular",
                  color: "white",
                }}
              />
            )}
            rules={{
              required: "Password is required",
              pattern: {
                value:
                  /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                message: "A strong password is required",
              },
            }}
          ></Controller>
          <Text style={{ color: "red", fontSize: 10, marginTop: 5 }}>
            {errors.password && errors.password.message}
          </Text>
        </ImageBackground>

        <View style={styles.display}>
          <View style={styles.display2}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <ImageBackground
                source={require("../assets/OK.png")}
                style={styles.OK}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ImageBackground
                source={require("../assets/Reset.png")}
                style={styles.REJECT}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <Image
        source={require("../assets/landscape.png")}
        style={styles.bottombar}
      />
    </View>
  );
};

export default SignupParent;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "BubblegumSans_400Regular",
    color: "white",
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "BubblegumSans_400Regular",
    color: "white",
    paddingTop: 5,
  },
  input: {
    marginTop: 5,
    height: 35,
    width: 250,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 2.5,
  },
  field: {
    marginTop: 30,
    justifyContent: "center",
    alignContent: "center",
  },
  display: {
    flex: 1,
    marginTop: 40,
  },
  display2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  OK: {
    height: 80,
    width: 80,
    resizeMode: "stretch",
    marginRight: 80,
  },
  REJECT: {
    height: 80,
    width: 80,
    resizeMode: "stretch",
  },
  note: {
    height: 600,
    width: window.width,
    resizeMode: "stretch",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 40,
    paddingTop: 49,
    alignItems: "center",
  },
  bottombar: {
    height: 222,
    width: window.width,
    resizeMode: "stretch",
  },
});
