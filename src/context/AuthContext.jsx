import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name: "John Doe" }
  const [credits, setCredits] = useState(15);

  const login = (name) => {
    setUser({ name });
  };

  const addCredits = (amount) => {
    setCredits((prev) => prev + amount);
  };

  const deductCredits = (amount) => {
    setCredits((prev) => Math.max(prev - amount, 0));
  };

  return (
    <AuthContext.Provider value={{ user, credits, login, addCredits, deductCredits }}>
      {children}
    </AuthContext.Provider>
  );
}
