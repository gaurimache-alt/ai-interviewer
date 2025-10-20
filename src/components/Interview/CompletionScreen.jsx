// src/components/CompletionScreen.jsx
import React, { useContext } from "react";
import { InterviewContext } from "../../context/InterviewContext";

export default function CompletionScreen() {
  const { answers } = useContext(InterviewContext);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-green-50">
      <div className="text-center">
        <div className="text-4xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold mb-2">Interview Completed</h1>
        <p className="text-gray-700 mb-4">{answers.filter(Boolean).length} / 16 answers recorded</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Review Answers</button>
      </div>
    </div>
  );
}
