import axios, { AxiosError } from "axios";
import { Alert } from "react-native";
import { API_URL, MIME_TYPES, ERROR_MESSAGES } from "../constants/api";
import { AudioResponse } from "../types/audio.types";

export async function sendAudio(uri: string): Promise<string | null> {
  try {
    const ext = uri.split(".").pop()?.toLowerCase() ?? "m4a";
    const formData = new FormData();

    // @ts-ignore - React Native FormData type
    formData.append("audio", {
      uri,
      name: `recording.${ext}`,
      type: MIME_TYPES[ext] ?? "audio/m4a",
    });

    const { data } = await axios.post<AudioResponse>(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 30000,
    });

    return data.text ?? data.message ?? "I received your audio.";
  } catch (error) {
    handleError(error);
    return null;
  }
}

function handleError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    Alert.alert("Error", "An unexpected error occurred.");
    return;
  }

  const { code, response } = error as AxiosError;

  if (code === "ECONNABORTED") {
    Alert.alert("Timeout", "Request timed out. Please try again.");
  } else if (!response) {
    Alert.alert("Network Error", "Could not connect to server.");
  } else {
    Alert.alert(
      "Error",
      ERROR_MESSAGES[response.status] ?? "Failed to send audio.",
    );
  }
}
