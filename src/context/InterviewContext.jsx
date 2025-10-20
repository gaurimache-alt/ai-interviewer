import React, { createContext, useState, useRef } from "react";
import { questions as QUESTIONS } from "../utils/questions";

export const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));

  const [recordingState, setRecordingState] = useState("idle");
  const recognitionRef = useRef(null);

  // For dashboard selection
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const startInterview = () => setStarted(true);

  const selectCompanyRole = (company, role) => {
    setSelectedCompany(company);
    setSelectedRole(role);
  };

  const playQuestion = (index = currentQuestionIndex) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = QUESTIONS[index];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const addAnswer = (text, index = currentQuestionIndex) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = text;
      return copy;
    });
  };

  const nextQuestion = () => {
    setRecordingState("idle");
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      const next = currentQuestionIndex + 1;
      setCurrentQuestionIndex(next);
    } else setCompleted(true);
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((i) => i - 1);
  };

  return (
    <InterviewContext.Provider
      value={{
        QUESTIONS,
        started,
        startInterview,
        completed,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        addAnswer,
        recordingState,
        setRecordingState,
        recognitionRef,
        playQuestion,
        nextQuestion,
        prevQuestion,
        selectedCompany,
        selectedRole,
        selectCompanyRole,
        setStarted
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}
