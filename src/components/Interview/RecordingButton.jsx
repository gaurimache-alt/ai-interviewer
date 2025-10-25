// src/components/RecordingButton.jsx
import React, { useContext, useCallback } from "react";
import { InterviewContext } from "../../context/InterviewContext";
import useRecording from "../../hooks/useRecording";
import styles from "../../styles/RecordingButton.module.css";

export default function RecordingButton() {
  const {
    addAnswer,
    currentQuestionIndex,
    nextQuestion,
    setRecordingState, // kept in case needed
  } = useContext(InterviewContext);

  // Callback to handle result from speech recognition
  const onResult = useCallback(
    (text) => {
      addAnswer(text, currentQuestionIndex);

      // Small delay to show completed state before moving next
      setTimeout(() => {
        nextQuestion();
      }, 800);
    },
    [addAnswer, currentQuestionIndex, nextQuestion]
  );

  const { state, start, stop, supportsRecognition } = useRecording(onResult);

  const handleClick = () => {
    if (!supportsRecognition()) {
      alert("Speech recognition not supported in this browser. Use Chrome.");
      return;
    }

    if (state === "idle") start();
    else if (state === "recording") stop();
    else if (state === "completed") start(); // allow re-record
  };

  // Dynamic label based on state
  const label = {
    idle: "🎤 Tap to Record",
    recording: "⏺ Recording...",
    processing: "⏳ Processing...",
    completed: "✅ Completed",
  }[state];

  // Dynamic className based on state
  const className = {
    idle: `${styles.button} ${styles.idle}`,
    recording: `${styles.button} ${styles.recording}`,
    processing: `${styles.button} ${styles.processing}`,
    completed: `${styles.button} ${styles.completed}`,
  }[state];

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto mt-6">
      <button onClick={handleClick} className={className}>
        {label}
      </button>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Tip: Click while speaking to stop early.
      </p>
    </div>
  );
}
