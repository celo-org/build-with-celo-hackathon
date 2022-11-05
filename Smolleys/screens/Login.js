import {
  BubblegumSans_400Regular,
  useFonts,
} from "@expo-google-fonts/bubblegum-sans";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
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

const Login = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = (formData) => {
    // Firebase Code
    const { email, password } = formData;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        navigation.navigate("AccountSuccess");
      })
      .catch((err) => {
        console.log(err);
      });
    // End Firebase Code
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
      <ImageBackground
        source={require("../assets/GreenLogin.png")}
        style={styles.note}
      >
        <Text style={styles.title}>LOGIN</Text>
        <Text style={styles.subtitle}>Email</Text>
        <ImageBackground
          source={require("../assets/textbox.png")}
          style={styles.input}
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                autoCompleteType="email"
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                placeholder="Email"
                onChangeText={(value) => onChange(value)}
                style={{
                  fontFamily: "BubblegumSans_400Regular",
                  color: "white",
                }}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Use a valid email",
              },
            }}
          />
          <Text>{errors.email && errors.email.message}</Text>
        </ImageBackground>
        <Text style={styles.subtitle}>Password</Text>
        <ImageBackground
          source={require("../assets/textbox.png")}
          style={styles.input}
        >
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  secureTextEntry
                  autoCompleteType="password"
                  placeholder="Password"
                  style={{
                    fontFamily: "BubblegumSans_400Regular",
                    color: "white",
                  }}
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
            }}
          />
          <Text>{errors.password && errors.password.message}</Text>
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

export default Login;

const styles = StyleSheet.create({
  field: {
    marginTop: 130,
    justifyContent: "center",
    alignContent: "center",
  },
  note: {
    height: 400,
    width: window.width,
    resizeMode: "stretch",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 40,
    paddingTop: 49,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: "BubblegumSans_400Regular",
    color: "white",
    paddingBottom: 20,
  },
  input: {
    marginTop: 5,
    height: 35,
    width: 250,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 2.5,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "BubblegumSans_400Regular",
    color: "white",
    paddingTop: 5,
  },
  display: {
    flex: 1,
    marginTop: 100,
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
});
