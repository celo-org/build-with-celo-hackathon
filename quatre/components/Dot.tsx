import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface DotProps {
  index: number;
  activeDotIndex?: Animated.SharedValue<number>;
}
const Dot: React.FC<DotProps> = ({ activeDotIndex, index }) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex?.value === index;
    return {
      backgroundColor: withTiming(isActive ? "black" : "white", {
        duration: 1500,
      }),
    };
  });
  return <Animated.View style={[styles.dot, rDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    margin: 1,
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 1,
  },
});
