import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(15);
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCredits = localStorage.getItem("credits");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCredits) setCredits(Number(storedCredits));

    setLoading(false); 
  }, []);

  
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  
  useEffect(() => {
    localStorage.setItem("credits", credits);
  }, [credits]);

  
  const login = (userData) => {
    
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  
  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const addCredits = (amount) => setCredits((prev) => prev + amount);
  const deductCredits = (amount) => setCredits((prev) => Math.max(prev - amount, 0));

  
  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{ user, credits, login, logout, addCredits, deductCredits }}
    >
      {children}
    </AuthContext.Provider>
  );
}
