import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [credits, setCredits] = useState(15);
  console.log("AuthContext — credits (context):", credits);

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
