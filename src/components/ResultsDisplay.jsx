"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ResultsDisplay({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="glassmorphic p-4 sm:p-6 rounded-xl"
    >
      <motion.h2 
        className="text-base sm:text-lg font-semibold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Result
      </motion.h2>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        >
          <motion.p 
            className="text-xs sm:text-sm text-gray-400 mb-2"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {result.type === "encrypt" ? "Plaintext" : "Ciphertext"}
          </motion.p>
          <motion.div 
            className="p-2 sm:p-3 bg-white/5 border border-white/20 rounded-lg break-words text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {result.input}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
        >
          <motion.p 
            className="text-xs sm:text-sm text-gray-400 mb-2"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {result.type === "encrypt" ? "Ciphertext" : "Plaintext"}
          </motion.p>
          <motion.div 
            className="p-2 sm:p-3 bg-gray-800/50 border border-white/20 rounded-lg break-words text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {result.output}
          </motion.div>
        </motion.div>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          whileTap={{ scale: 0.95, y: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="w-full py-2 px-3 sm:px-4 bg-white/10 text-white font-medium rounded-lg text-sm sm:text-base"
        >
          {copied ? "✓ Copied!" : "Copy Result"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}