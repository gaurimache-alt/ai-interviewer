import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import fetchFunction from "../../utils/fetchFunction";
import { GET_INTERVIEW_DETAILS } from "../../utils/constants";
import { InterviewContext } from "../../context/InterviewContext";
import { Link } from "react-router-dom";

export function ReviewPage() {
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [error, setError] = useState("");


  const { user } = useContext(AuthContext);
  const { dbQuestions,setLoadding } = useContext(InterviewContext);

  async function GetInterviewDetails() {
    try {
      setLoadding(true);
      const result = await fetchFunction({
        apiUrl:
          GET_INTERVIEW_DETAILS +
          user?.user[0]?._id +
          "/" +
          dbQuestions?.questionsSet?._id,
        crudMethod: "GET",
        setError,
      });
      if (result.status === "success") {
        console.log(result);
        setInterviewDetails(result);
      } else {
        setError("Error in Fetch: " + result?.message);
      }
      setLoadding(false)
    } catch (err) {
      setError("Error in Fetch: " + err);
    } finally {
      setLoadding(false);
    }
  }

  useEffect(() => {
    GetInterviewDetails();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-3">
            Interview Review
          </h1>
          <p className="text-gray-600 text-lg">
            Review your answers before final submission
          </p>
          {interviewDetails?.candidate && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-gray-600">Candidate:</span>
              <span className="font-semibold text-indigo-700">
                {interviewDetails.candidate.name}
              </span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Questions and Answers Cards */}
        <div className="space-y-6 mb-8">
          {interviewDetails?.answerDetails?.map((set, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-indigo-100 hover:border-indigo-300 transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm tracking-wider uppercase">
                    Question {idx + 1}
                  </span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {idx + 1} / {interviewDetails?.answerDetails?.length}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-6">
                {/* Question Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Question
                    </h3>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border-l-4 border-indigo-500">
                    <p className="text-gray-800 text-base sm:text-lg font-medium leading-relaxed">
                      {set?.question}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-gray-400 text-xs">
                      YOUR ANSWER
                    </span>
                  </div>
                </div>

                {/* Answer Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Your Response
                    </h3>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-green-500 min-h-[100px]">
                    <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                      {set?.answerFromDb || "No answer provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        {interviewDetails && (
          <div className="flex justify-center items-center pt-6 pb-8">
            <Link to={"/dashboard"}>
            <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg">
              Submit Interview
            </button>
            </Link>
          </div>
        )}

        {/* Stats Footer */}
        {interviewDetails && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-gray-500 text-sm mb-1">Total Questions</p>
              <p className="text-2xl font-bold text-indigo-600">
                {interviewDetails?.answerDetails?.length || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-gray-500 text-sm mb-1">Answered</p>
              <p className="text-2xl font-bold text-green-600">
                {interviewDetails?.answerDetails?.filter((a) => a.answerFromDb)
                  .length || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-gray-500 text-sm mb-1">Completion</p>
              <p className="text-2xl font-bold text-purple-600">
                {interviewDetails?.answerDetails?.length > 0
                  ? Math.round(
                      (interviewDetails?.answerDetails?.filter(
                        (a) => a.answerFromDb
                      ).length /
                        interviewDetails?.answerDetails?.length) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}