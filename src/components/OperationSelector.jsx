"use client";

import { motion } from "framer-motion";

export default function OperationSelector({ operation, setOperation }) {
  return (
    <motion.div
      className="glassmorphic p-4 sm:p-6 rounded-xl"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.h2
        className="text-base sm:text-lg font-semibold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Select Operation
      </motion.h2>
      <motion.div
        className="flex gap-3 sm:gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {["encrypt", "decrypt"].map((op) => (
          <motion.button
            key={op}
            onClick={() => setOperation(op)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium transition-all text-sm sm:text-base ${
              operation === op
                ? "bg-gray-700 text-white shadow-lg shadow-gray-700/50"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
