"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function ResultsDisplay({ result }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphic p-4 sm:p-6 rounded-xl"
    >
      <h2 className="text-base sm:text-lg font-semibold mb-4">Result</h2>

      <div className="space-y-4">
        <div>
          <p className="text-xs sm:text-sm text-gray-400 mb-2">
            {result.type === "encrypt" ? "Plaintext" : "Ciphertext"}
          </p>
          <div className="p-2 sm:p-3 bg-white/5 border border-white/20 rounded-lg break-words text-sm sm:text-base">
            {result.input}
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="text-xl sm:text-2xl"
          >
            ↓
          </motion.div>
        </div>

        <div>
          <p className="text-xs sm:text-sm text-gray-400 mb-2">
            {result.type === "encrypt" ? "Ciphertext" : "Plaintext"}
          </p>
          <div className="p-2 sm:p-3 bg-gray-800/50 border border-white/20 rounded-lg break-words text-sm sm:text-base">
            {result.output}
          </div>
        </div>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 px-3 sm:px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all text-sm sm:text-base"
        >
          {copied ? "✓ Copied!" : "Copy Result"}
        </motion.button>
      </div>
    </motion.div>
  )
}
