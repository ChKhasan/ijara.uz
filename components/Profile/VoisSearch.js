import { ref } from "vue";

export function useSpeechRecognition(lang) {
  const recognitionResult = ref("");
  const isRecording = ref(false);
  let recognition = null;

  const startRecognition = () => {
    if (!recognition) {
      const Speech = window.webkitSpeechRecognition;
      recognition = new Speech();
      recognition.lang = lang;

      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        isRecording.value = false;
        recognitionResult.value = text;
      };
    }
    recognition.start();
    isRecording.value = true;
  };

  return {
    recognitionResult,
    isRecording,
    startRecognition,
  };
}
