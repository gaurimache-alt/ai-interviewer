import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/LoginForm.module.css"; // reuse the same styles
import useAuth from "../../hooks/useAuth";

export default function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all the fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    // Password validation (min 6 chars)
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // ✅ If validation passes, call signup from auth context
    signup({ name, email, password });

    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#a7c0f2] via-[#7ea1e8] to-[#a7c0f2] px-4">
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Sign Up
        </button>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
