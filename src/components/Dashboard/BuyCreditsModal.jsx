// src/components/Dashboard/BuyCreditsModal.jsx
import React from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

export default function BuyCreditsModal() {
  const { addCredits, closeModal } = useAuth();

  const handleBuy = () => {
    addCredits(15); // add 15 credits
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-80 text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <h2 className="text-xl font-bold mb-4">Not enough credits!</h2>
        <p className="mb-4 text-gray-600">
          You need more credits to continue the interview.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            onClick={handleBuy}
          >
            Buy 15 Credits
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
