"use client";

import { motion } from "framer-motion";

export default function MatrixDisplay({ matrix }) {
  const tooltips = {
    sameRow: "Same row: shift right (wrap around)",
    sameCol: "Same column: shift down (wrap around)",
    rectangle: "Rectangle: swap columns",
  };

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
        Cipher Matrix (5x5)
      </motion.h2>

      {matrix.length > 0 ? (
        <motion.div
          className="grid grid-cols-5 gap-1 sm:gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {matrix.flat().map((letter, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.02 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(107, 114, 128, 0.6)",
              }}
              className="aspect-square bg-gray-800/50 border border-white/30 rounded-lg flex items-center justify-center font-bold text-xs sm:text-base cursor-pointer hover:border-gray-400 transition-all"
              title={tooltips[["sameRow", "sameCol", "rectangle"][idx % 3]]}
            >
              {letter}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-8 text-gray-400 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Enter a key to generate the matrix
        </motion.div>
      )}

      {/* Legend */}
      <motion.div
        className="mt-6 space-y-2 text-xs sm:text-sm text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
      >
        <motion.p
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="text-gray-500">•</span> Same row: shift right
        </motion.p>
        <motion.p
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="text-gray-500">•</span> Same column: shift down
        </motion.p>
        <motion.p
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="text-gray-500">•</span> Rectangle: swap columns
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
