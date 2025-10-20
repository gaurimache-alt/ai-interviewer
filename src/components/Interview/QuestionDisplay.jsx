// src/components/QuestionDisplay.jsx
import React, { useContext } from "react";
import { InterviewContext } from "../../context/InterviewContext";

export default function QuestionDisplay() {
  const { QUESTIONS, currentQuestionIndex } = useContext(InterviewContext);
  const question = QUESTIONS[currentQuestionIndex];

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-lg md:text-xl font-semibold">
      {question}
    </div>
  );
}
