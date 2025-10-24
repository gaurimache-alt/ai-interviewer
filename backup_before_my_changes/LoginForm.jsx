// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import styles from "../../styles/LoginForm.module.css";
import { motion } from "framer-motion";

export default function LoginForm() {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return alert("Fill all fields!");
    if (isSignUp) signup(email.trim(), password.trim());
    else login(email.trim(), password.trim());
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-gradient animate-pulse">
          Welcome to AI-Interviewer
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${styles.input} border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${styles.input} border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg shadow-md transform hover:scale-105 transition"
            whileTap={{ scale: 0.95 }}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </motion.button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-purple-600 cursor-pointer hover:underline font-medium"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
