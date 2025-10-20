import React, { useContext, useEffect } from "react";
import { InterviewContext } from "../../context/InterviewContext";
import QuestionDisplay from "./QuestionDisplay";
import AnswerDisplay from "./AnswerDisplay";
import RecordingButton from "./RecordingButton";
import NavigationControls from "./NavigationControls";
import ProgressionIndicator from "./ProgressionIndicator";
import styles from "../../styles/InterviewContainer.module.css";

export default function InterviewContainer() {
  const { QUESTIONS, currentQuestionIndex, playQuestion, selectedCompany, selectedRole } =
    useContext(InterviewContext);

  // Auto play question when component mounts or question changes
  useEffect(() => {
    playQuestion(currentQuestionIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  return (
    <div className={styles.container}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Interview: {selectedCompany} - {selectedRole}
        </h2>
      </div>

      <ProgressionIndicator total={QUESTIONS.length} current={currentQuestionIndex + 1} />

      <QuestionDisplay />

      <div className="flex justify-end">
        <button
          onClick={() => playQuestion(currentQuestionIndex)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          🔊 Replay
        </button>
      </div>

      <AnswerDisplay />

      <RecordingButton />

      <NavigationControls />
    </div>
  );
}
