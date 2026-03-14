import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Audio } from "expo-av";
import axios from "axios";
import * as Speech from "expo-speech";

export default function HomeScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [responseText, setResponseText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  async function startRecording() {
    if (recording) return;

    const permissionResponse = await Audio.requestPermissionsAsync();

    if (!permissionResponse.granted) {
      alert("Microphone permission required");
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );

    setRecording(newRecording);
    setIsRecording(true);

    console.log("Recording started");
  }

  async function stopRecording() {
    if (!recording) return;

    await recording.stopAndUnloadAsync();

    const uri = recording.getURI();

    console.log("Audio saved at:", uri);

    setRecording(null);
    setIsRecording(false);

    if (uri) {
      sendAudio(uri);
    }
  }

  async function sendAudio(uri: string) {
    const formData = new FormData();

    formData.append("audio", {
      uri: uri,
      name: "voice.m4a",
      type: "audio/m4a",
    } as any);

    try {
      const res = await axios.post(
        "https://scruffily-nonmethodic-galileo.ngrok-free.dev/chat",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const reply = res.data.text;

      setResponseText(reply);

      Speech.speak(reply);
    } catch (error) {
      console.log("Error sending audio:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Talk To Yourself AI</Text>

      <Text style={styles.status}>
        {isRecording ? "Recording..." : "Tap to speak"}
      </Text>

      <View style={{ height: 20 }} />

      <Button title="Start Recording" onPress={startRecording} />

      <View style={{ height: 20 }} />

      <Button title="Stop Recording" onPress={stopRecording} />

      <Text style={styles.response}>AI Response: {responseText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: "bold",
  },

  status: {
    fontSize: 16,
    marginBottom: 10,
  },

  response: {
    marginTop: 40,
    fontSize: 16,
    textAlign: "center",
  },
});
