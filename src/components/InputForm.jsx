"use client"

import { motion } from "framer-motion"

export default function InputForm({
  operation,
  plaintext,
  setPlaintext,
  ciphertext,
  setCiphertext,
  cipherKey,
  setCipherKey,
  usePlaintextKey,
  setUsePlaintextKey,
  onSubmit,
  onReset,
  loading,
}) {
  return (
    <div className="glassmorphic p-4 sm:p-6 rounded-xl">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        {operation === "encrypt" ? "Encrypt Message" : "Decrypt Message"}
      </h2>

      <div className="space-y-4">
        {/* Plaintext/Ciphertext Input */}
        {operation === "encrypt" ? (
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-300">Plaintext</label>
            <textarea
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
              placeholder="Enter text to encrypt"
              className="w-full p-2 sm:p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 resize-none text-sm sm:text-base"
              rows="3"
            />
          </div>
        ) : (
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-300">Ciphertext</label>
            <textarea
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value.toUpperCase())}
              placeholder="Enter text to decrypt"
              className="w-full p-2 sm:p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 resize-none text-sm sm:text-base"
              rows="3"
            />
          </div>
        )}

        {/* Key Input */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-300">Key</label>
          <input
            type="text"
            value={cipherKey}
            onChange={(e) => setCipherKey(e.target.value.toUpperCase())}
            placeholder="Enter encryption key"
            className="w-full p-2 sm:p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 text-sm sm:text-base"
            disabled={usePlaintextKey && operation === "encrypt"}
          />
        </div>

        {/* Plaintext-derived Key Checkbox */}
        {operation === "encrypt" && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={usePlaintextKey}
              onChange={(e) => setUsePlaintextKey(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-xs sm:text-sm text-gray-300">Use plaintext-derived key (if key is empty)</span>
          </label>
        )}

        {/* Buttons */}
        <div className="flex gap-2 sm:gap-3 pt-4">
          <motion.button
            onClick={onSubmit}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-700/50 disabled:opacity-50 transition-all text-sm sm:text-base"
          >
            {loading ? "Processing..." : "Submit"}
          </motion.button>
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base"
          >
            Reset
          </motion.button>
        </div>
      </div>
    </div>
  )
}
