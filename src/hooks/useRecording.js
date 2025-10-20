import { useState, useRef, useEffect } from "react";

export default function useRecording(onResult) {
  const [state, setState] = useState("idle"); 
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort?.();
        } catch {}
      }
    };
  }, []);

  const supportsRecognition = () =>
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

  const start = () => {
    if (!supportsRecognition()) {
      alert("Speech recognition not supported. Use Chrome.");
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.lang = "en-US";
    r.interimResults = false;
    r.continuous = false;

    r.onstart = () => setState("recording");
    r.onresult = (e) => {
      setState("processing");
      const text = e.results[0][0].transcript;
      setTimeout(() => {
        setState("completed");
        onResult?.(text);
      }, 500);
    };
    r.onerror = () => setState("idle");
    recognitionRef.current = r;
    r.start();
  };

  const stop = () => {
    recognitionRef.current?.stop();
  };

  return { state, start, stop, supportsRecognition };
}
