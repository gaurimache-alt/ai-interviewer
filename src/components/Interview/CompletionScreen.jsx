// src/components/CompletionScreen.jsx
import React, { useContext, useEffect, useState } from "react";
import { InterviewContext } from "../../context/InterviewContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import fetchFunction from "../../utils/fetchFunction";
import { Save_Answer } from "../../utils/constants";

export default function CompletionScreen() {
  const { answers,dbQuestions } = useContext(InterviewContext);
  const {user} = useContext(AuthContext);
  const [error,setError] = useState("");

  const postData = {
    candidate : user?.user[0]?._id,
    questionSetId : dbQuestions?.questionsSet?._id,
    answers
  }
  console.log(postData)
  useEffect(()=>{
    try {
      const result = fetchFunction({
        apiUrl : Save_Answer,
        crudMethod : "POST",
        postData,
        setError
      })
      if(result?.status === "success"){
        console.log(result);
      }else{
        console.log("Error in Posting : ", error)
      }
    } catch (err) {
      setError("Error Caused + ",err)
    }
  },[])


  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-green-50">
      <div className="text-center">
        <div className="text-4xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold mb-2">Interview Completed</h1>
        <p className="text-gray-700 mb-4">{answers.filter(Boolean).length} / 16 answers recorded</p>
        <Link to={"/review"}><button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Review Answers</button></Link>
      </div>
    </div>
  );
}
