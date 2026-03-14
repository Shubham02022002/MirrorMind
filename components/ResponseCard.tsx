import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors as colors } from "../constants/theme";

interface ResponseCardProps {
  text: string;
}

export default function ResponseCard({ text }: ResponseCardProps) {
  if (!text) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Response</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: 20,
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 26,
  },
});
