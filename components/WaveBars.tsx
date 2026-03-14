import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, StyleSheet } from "react-native";
import { Colors as colors } from "../constants/theme";

interface WaveBarsProps {
  isRecording: boolean;
}

export default function WaveBars({ isRecording }: WaveBarsProps) {
  const bars = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

  useEffect(() => {
    if (isRecording) {
      bars.forEach((bar, i) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(bar, {
              toValue: 1,
              duration: 400 + i * 80,
              delay: i * 100,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(bar, {
              toValue: 0.2,
              duration: 400 + i * 80,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ).start();
      });
    } else {
      bars.forEach((bar) => {
        bar.stopAnimation();
        Animated.timing(bar, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isRecording]);

  return (
    <View style={styles.container}>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            isRecording && styles.barActive,
            { transform: [{ scaleY: bar }] },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    height: 48,
    marginBottom: 20,
  },
  bar: {
    width: 4,
    height: 32,
    borderRadius: 2,
    backgroundColor: colors.waveIdle,
  },
  barActive: {
    backgroundColor: colors.primary,
  },
});
