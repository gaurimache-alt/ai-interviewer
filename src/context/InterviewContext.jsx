import React, { createContext, useState, useRef } from "react";
import { questions as QUESTIONS } from "../utils/questions";
import fetchFunction from "../utils/fetchFunction";
import { QUESTIONS_BY_COMPANY } from "../utils/constants";

export const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));

  const [recordingState, setRecordingState] = useState("idle");
  const [dbQuestions,setDbQuestions] = useState(null);
  const [dbQuestionsError,setDbQuestionsError] = useState("");
  const recognitionRef = useRef(null);

  // For dashboard selection
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const startInterview = () => setStarted(true);

  const selectCompanyRole =async (slug,company, role) => {
    setSelectedCompany(company);
    setSelectedRole(role);
    const result =await fetchFunction({
      apiUrl : QUESTIONS_BY_COMPANY+slug,
      crudMethod : "GET",
      setError : setDbQuestionsError
    })

    if(result.status === "success"){
      setDbQuestions(result);
    }else{
      console.log("ERROR IN FETCHING SLUG : ",dbQuestionsError);
    }
  };
   let questionSet = (dbQuestions && dbQuestions?.questionsSet?.questions) || QUESTIONS
  const playQuestion = (index = currentQuestionIndex) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = questionSet[index]?.question || questionSet[index];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const addAnswer = (text, index = currentQuestionIndex) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = {
        questionId : questionSet[index]?.questionId,  
        answer : text || "No Answer Recorded"
      };
      return copy;
    });
  };

  const nextQuestion = () => {
    setRecordingState("idle");
    if (currentQuestionIndex < questionSet.length - 1) {
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
        dbQuestions,
        questionSet,
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
