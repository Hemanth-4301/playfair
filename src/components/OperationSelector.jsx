"use client"

import { motion } from "framer-motion"

export default function OperationSelector({ operation, setOperation }) {
  return (
    <div className="glassmorphic p-4 sm:p-6 rounded-xl">
      <h2 className="text-base sm:text-lg font-semibold mb-4">Select Operation</h2>
      <div className="flex gap-3 sm:gap-4">
        {["encrypt", "decrypt"].map((op) => (
          <motion.button
            key={op}
            onClick={() => setOperation(op)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium transition-all text-sm sm:text-base ${
              operation === op
                ? "bg-gray-700 text-white shadow-lg shadow-gray-700/50"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
