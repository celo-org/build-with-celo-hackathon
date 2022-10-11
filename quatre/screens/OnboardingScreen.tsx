import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { BACKGROUND_COLOR, PAGES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import Page, { PAGE_WIDTH } from "../components/Page";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Dot from "../components/Dot";
import { AntDesign } from "@expo/vector-icons";
import { StackParams } from "../App";
import type { StackNavigationProp } from "@react-navigation/stack";

const OnboardingScreen = () => {
  const translateX = useSharedValue(0);

  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      translateX.value = e.contentOffset.x;
    },
  });
  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const scrollRef = useAnimatedRef<ScrollView>();

  const onIconPress = useCallback(() => {
    if (activeIndex.value === PAGES.length - 1) return;
    scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
  }, []);
  const onIconPressBack = useCallback(() => {
    if (activeIndex.value === 0) return;
    scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value - 1) });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MainPage")}
      >
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
      <Animated.ScrollView
        ref={scrollRef as any}
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGES.map((page, index) => (
          <Page
            key={index.toString()}
            page={page}
            translateX={translateX}
            index={index}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        <View style={styles.fillCenter}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={onIconPressBack}
          />
        </View>
        <View style={styles.paginator}>
          {PAGES.map((_, index) => {
            return (
              <Dot
                key={index.toString()}
                index={index}
                activeDotIndex={activeIndex}
              />
            );
          })}
        </View>
        <View style={styles.fillCenter}>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={onIconPress}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.buttonAction]}
        onPress={() => navigation.navigate("MainPage")}
      >
        <Text style={styles.buttonTitle}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
  },
  button: {
    position: "absolute",
    top: 60,
    right: 40,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
  },
  footer: {
    height: 50,
    marginBottom: 30,
    flexDirection: "row",
  },
  paginator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonAction: {
    marginTop: 30,
    width: PAGE_WIDTH * 0.8,
    height: 50,
    backgroundColor: "#F87C00",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  buttonTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
    lineHeight: 24,
  },
  fillCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
