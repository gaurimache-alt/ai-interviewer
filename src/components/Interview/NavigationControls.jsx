// src/components/NavigationControls.jsx
import React, { useContext } from "react";
import { InterviewContext } from "../../context/InterviewContext";
import { Link } from "react-router-dom";

export default function NavigationControls() {
  const { currentQuestionIndex, prevQuestion, nextQuestion, QUESTIONS, playQuestion } = useContext(InterviewContext);

  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={() => {
          prevQuestion();
          playQuestion(currentQuestionIndex - 1);
        }}
        disabled={currentQuestionIndex === 0}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

        <Link to={"/completed"}>
        <button
        hidden={currentQuestionIndex !== 15}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Go to Completion Screen
      </button>
        </Link>
        
      <button
        onClick={() => {
          nextQuestion();
          playQuestion(currentQuestionIndex + 1);
        }}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        Next
      </button>
    </div>
  );
}
