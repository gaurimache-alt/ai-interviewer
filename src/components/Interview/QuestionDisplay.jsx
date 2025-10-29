// src/components/QuestionDisplay.jsx
import React, { useContext } from "react";
import { InterviewContext } from "../../context/InterviewContext";

export default function QuestionDisplay() {
  const { questionSet, currentQuestionIndex } = useContext(InterviewContext);
  const currQuestion = questionSet[currentQuestionIndex]?.question;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-lg md:text-xl font-semibold">
      {currQuestion}
    </div>
  );
}
