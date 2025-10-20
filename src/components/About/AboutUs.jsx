// src/components/About/AboutUs.jsx
import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-purple-200 to-pink-200 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">About AI Interviewer</h1>
      <p className="text-center max-w-xl mb-6">
        AI Interviewer is an interactive platform designed to help job seekers
        practice interviews for top tech companies. Users can select roles,
        attempt interviews, and track their performance using a credit-based
        system.
      </p>
      <p className="text-center max-w-xl">
        Built with React, this project includes a dynamic dashboard, real-time
        interview simulations, and an intuitive login/signup system. Enhance
        your interview skills with AI Interviewer today!
      </p>
    </div>
  );
}
