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
    setRecordingState, // we won't actually use context's setRecordingState here but keep if needed
  } = useContext(InterviewContext);

  // onResult callback to pass to the hook
  const onResult = useCallback(
    (text) => {
      // add to answers for current question and move to next
      addAnswer(text, currentQuestionIndex);
      // small delay to show completed state then go next
      setTimeout(() => {
        nextQuestion();
      }, 700);
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
    else if (state === "completed") {
      // reset or let user re-record - just set to idle in hook (not exposed)
      // we'll allow them to record again by calling start()
      start();
    }
  };

  const label =
    state === "idle"
      ? "🎤 Tap to Record"
      : state === "recording"
      ? "⏺ Recording..."
      : state === "processing"
      ? "⏳ Processing..."
      : "✅ Completed";

  const className =
    state === "recording"
      ? `${styles.button} ${styles.recording}`
      : state === "processing"
      ? `${styles.button} ${styles.processing}`
      : state === "completed"
      ? `${styles.button} ${styles.completed}`
      : `${styles.button} ${styles.idle}`;

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleClick} className={className}>
        {label}
      </button>
      <p className="text-sm text-gray-500 mt-2">Tip: Click while speaking to stop early.</p>
    </div>
  );
}
