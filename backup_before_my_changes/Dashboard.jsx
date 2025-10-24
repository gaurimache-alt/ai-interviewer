// src/components/Dashboard/Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import CreditsDisplay from "./CreditsDisplay";
import RoleGrid from "./RoleGrid";

export default function Dashboard({ credits, onSelect }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 p-6">
      {/* Animated header */}
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-purple-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to AI-Interviewer Dashboard
      </motion.h1>

      {/* Credits */}
      <div className="flex justify-center mb-8">
        <CreditsDisplay credits={credits} />
      </div>

      {/* Role Cards */}
      <RoleGrid onSelect={onSelect} />
    </div>
  );
}
