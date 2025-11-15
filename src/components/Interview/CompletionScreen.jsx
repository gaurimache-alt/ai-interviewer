// src/components/Interview/CompletionScreen.jsx
import React, { useContext, useEffect, useState } from "react";
import { InterviewContext } from "../../context/InterviewContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import fetchFunction from "../../utils/fetchFunction";
import { Save_Answer } from "../../utils/constants";

export default function CompletionScreen() {
  //  use setLoadding (same as in InterviewContext)
  const { answers, dbQuestions, questionSet, setLoadding } =
    useContext(InterviewContext);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");

  // --- Safe counters for UI ---
  const totalQuestions =
    dbQuestions?.questionsSet?.questions?.length || questionSet?.length || 0;

  const answeredCount = answers.filter(
    (a) =>
      a &&
      typeof a.answer === "string" &&
      a.answer.trim() !== "" &&
      a.answer.trim().toLowerCase() !== "no answer recorded"
  ).length;

  useEffect(() => {
    // Guard: if required data missing, don't call API
    if (!user?.user?.[0]?._id || !dbQuestions?.questionsSet?._id || !questionSet) {
      return;
    }

    const saveAnswers = async () => {
      setLoadding(true);
      try {
        // --- Normalize answers for backend ---
        // Ensure we always send an entry for every question
        const normalizedAnswers = questionSet.map((q, idx) => {
          const fromCtx = answers[idx];

          const cleanAnswer =
            fromCtx &&
            typeof fromCtx.answer === "string" &&
            fromCtx.answer.trim() !== "" &&
            fromCtx.answer.trim().toLowerCase() !== "no answer recorded"
              ? fromCtx.answer.trim()
              : "No answer provided"; // backend gets a valid string

          return {
            questionId: q._id || q.questionId, // adjust according to your API
            answer: cleanAnswer,
          };
        });

        const postData = {
          candidate: user.user[0]._id,
          questionSetId: dbQuestions.questionsSet._id,
          answers: normalizedAnswers,
        };

        const result = await fetchFunction({
          apiUrl: Save_Answer,
          crudMethod: "POST",
          postData,
          setError,
        });

        if (result?.status !== "success") {
          console.error("Error in Posting:", result?.message);
          setError(
            result?.message || "Something went wrong while saving your answers."
          );
        }
      } catch (err) {
        console.error("Error while saving answers:", err);
        setError("Error while saving your answers.");
      } finally {
        setLoadding(false);
      }
    };

    saveAnswers();
  }, [user, dbQuestions, questionSet, answers, setLoadding]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-green-50">
      <div className="text-center">
        <div className="text-4xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold mb-2">Interview Completed</h1>

        <p className="text-gray-700 mb-2">
          {answeredCount} / {totalQuestions} answers recorded
        </p>

        {error && (
          <p className="text-red-500 text-sm font-medium mb-3">{error}</p>
        )}

        <Link to={"/review"}>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            Review Answers
          </button>
        </Link>
      </div>
    </div>
  );
}
