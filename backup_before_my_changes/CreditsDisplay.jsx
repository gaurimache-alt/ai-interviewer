// src/components/Dashboard/CreditsDisplay.jsx
import React from "react";

export default function CreditsDisplay({ credits }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl px-4 py-2 w-40 text-center font-semibold text-purple-700 mb-6">
      Credits: {credits}
    </div>
  );
}
