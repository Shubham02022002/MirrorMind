import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useRecording } from "@/hooks/useRecordings";
import MicButton from "@/components/MicButton";
import WaveBars from "@/components/WaveBars";
import ResponseCard from "@/components/ResponseCard";
import { Colors as colors } from "@/constants/theme";

export default function HomeScreen() {
  const { isRecording, isLoading, responseText, start, stop } = useRecording();
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const statusText = isLoading
    ? "Processing..."
    : isRecording
      ? "Listening..."
      : "Tap to speak";

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <Text style={styles.title}>MirrorMind</Text>
      <Text style={styles.subtitle}>Your AI voice companion</Text>

      <MicButton
        isRecording={isRecording}
        isLoading={isLoading}
        onPress={isRecording ? stop : start}
      />

      <WaveBars isRecording={isRecording} />

      <Text style={[styles.status, isRecording && styles.statusActive]}>
        {statusText}
      </Text>

      <ResponseCard text={responseText} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: 1,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textDim,
    letterSpacing: 0.5,
    marginBottom: 64,
  },
  status: {
    fontSize: 15,
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 40,
  },
  statusActive: {
    color: colors.primary,
  },
});
