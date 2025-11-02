// src/components/AnswerDisplay.jsx
import React, { useContext } from "react";
import { InterviewContext } from "../../context/InterviewContext";
import styles from "../../styles/AnswerBox.module.css";

export default function AnswerDisplay() {
  const { answers, currentQuestionIndex } = useContext(InterviewContext);
  const text = answers[currentQuestionIndex].answer || "";

  return (
    <div role="status" aria-live="polite" className={styles.box}>
      {text || "Your answer will appear here..."}
    </div>
  );
}
