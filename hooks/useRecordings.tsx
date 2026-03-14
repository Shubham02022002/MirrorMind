import { useState } from "react";
import { Alert } from "react-native";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { sendAudio } from "../services/audioService";

export function useRecording() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  async function start() {
    try {
      if (recording) return;

      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Permission Required",
          "Microphone access is needed to record audio.",
        );
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
    } catch {
      Alert.alert("Error", "Failed to start recording.");
    }
  }

  async function stop() {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      setRecording(null);
      setIsRecording(false);

      if (uri) {
        setIsLoading(true);
        const reply = await sendAudio(uri);
        if (reply) {
          setResponseText(reply);
          await Speech.speak(reply);
        }
        setIsLoading(false);
      }
    } catch {
      Alert.alert("Error", "Failed to process recording.");
    }
  }

  return { isRecording, isLoading, responseText, start, stop };
}
