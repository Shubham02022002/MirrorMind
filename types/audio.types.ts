export interface AudioResponse {
  text?: string;
  message?: string;
  success: boolean;
}

export interface RecordingState {
  isRecording: boolean;
  isLoading: boolean;
  responseText: string;
}
