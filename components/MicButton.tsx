import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Colors as colors} from "../constants/theme";

interface MicButtonProps {
  isRecording: boolean;
  isLoading: boolean;
  onPress: () => void;
}

export default function MicButton({
  isRecording,
  isLoading,
  onPress,
}: MicButtonProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  return (
    <View style={styles.wrapper}>
      {isRecording && (
        <Animated.View
          style={[styles.ripple, { transform: [{ scale: pulseAnim }] }]}
        />
      )}
      <TouchableOpacity
        style={[
          styles.button,
          isRecording && styles.buttonActive,
          isLoading && styles.buttonLoading,
        ]}
        onPress={onPress}
        disabled={isLoading}
        activeOpacity={0.85}
      >
        <View style={styles.iconWrapper}>
          <View style={[styles.head, isRecording && styles.headActive]} />
          <View style={[styles.body, isRecording && styles.bodyActive]} />
          <View style={[styles.stand, isRecording && styles.standActive]} />
          <View style={[styles.base, isRecording && styles.baseActive]} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  ripple: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryDim,
  },
  button: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#1a1a2e",
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: colors.primaryDim,
    borderColor: colors.primary,
  },
  buttonLoading: { opacity: 0.5 },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 38,
  },
  head: {
    width: 16,
    height: 22,
    borderRadius: 8,
    backgroundColor: colors.micIdle,
  },
  headActive: { backgroundColor: colors.primary },
  body: {
    width: 24,
    height: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: colors.micIdle,
    marginTop: -1,
  },
  bodyActive: { borderColor: colors.primary },
  stand: {
    width: 2,
    height: 6,
    backgroundColor: colors.micIdle,
  },
  standActive: { backgroundColor: colors.primary },
  base: {
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.micIdle,
  },
  baseActive: { backgroundColor: colors.primary },
});
