// src/components/Dashboard/RoleCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function RoleCard({ company, role, onClick }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transform hover:scale-105 transition"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="font-semibold text-lg mb-2">{company}</h3>
      <p className="text-gray-500">{role}</p>
    </motion.div>
  );
}
