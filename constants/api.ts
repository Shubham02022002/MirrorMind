export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const MIME_TYPES: Record<string, string> = {
  m4a: "audio/m4a",
  mp4: "audio/mp4",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  aac: "audio/aac",
  ogg: "audio/ogg",
  webm: "audio/webm",
  "3gp": "audio/3gpp",
  amr: "audio/amr",
};

export const ERROR_MESSAGES: Record<number, string> = {
  413: "Audio file is too large. Please record a shorter message.",
  415: "Audio format not supported. Please try again.",
  500: "Server error occurred. Please try again.",
};
