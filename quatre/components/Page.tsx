import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { PageInterface } from "../constants";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  page: PageInterface;
  translateX: Animated.SharedValue<number>;
  index: number;
}

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");
const Page: React.FC<PageProps> = ({ page, translateX, index }) => {
  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];
  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return { transform: [{ scale }] };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      inputRange,
      [0, 0, -1],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return { opacity, transform: [{ rotate: `${progress * Math.PI}rad` }] };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
        <Animated.Image
          source={page.source}
          style={[styles.image, rImageStyle]}
          resizeMode={"contain"}
        />
      </View>
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.description}>{page.description}</Text>
    </View>
  );
};

const CIRCLE_WIDTH = PAGE_WIDTH * 0.5;

export { PAGE_WIDTH };
export default Page;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  circle: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E5E5",
    borderRadius: CIRCLE_WIDTH / 2,
  },
  circleContainer: {
    width: CIRCLE_WIDTH,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  image: {
    height: PAGE_HEIGHT * 0.5,
    aspectRatio: 1,
    position: "absolute",
  },
  title: {
    marginBottom: 30,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
    color: "#1E1E1E",
  },
  description: {
    textAlign: "center",
    fontSize: 20,
    color: "#7D7D7D",
  },
  //   button: {
  //     marginTop: 30,
  //     width: PAGE_WIDTH * 0.8,
  //     height: 50,
  //     backgroundColor: "#F87C00",
  //     borderRadius: 25,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     flexDirection: "row",
  //   },
  //   buttonTitle: {
  //     fontSize: 20,
  //     color: "#FFFFFF",
  //     fontWeight: "600",
  //     lineHeight: 24,
  //   },
});
