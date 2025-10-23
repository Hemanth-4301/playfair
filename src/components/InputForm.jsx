"use client";

import { motion } from "framer-motion";

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
        {operation === "encrypt" ? "Encrypt Message" : "Decrypt Message"}
      </motion.h2>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Plaintext/Ciphertext Input */}
        {operation === "encrypt" ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.label 
              className="block text-xs sm:text-sm font-medium mb-2 text-gray-300"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Plaintext
            </motion.label>
            <motion.textarea
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
              placeholder="Enter text to encrypt"
              className="w-full p-2 sm:p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 resize-none text-sm sm:text-base"
              rows="3"
              whileHover={{ scale: 1.01 }}
              whileFocus={{ scale: 1.02, borderColor: "rgb(107, 114, 128)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.label 
              className="block text-xs sm:text-sm font-medium mb-2 text-gray-300"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Ciphertext
            </motion.label>
            <motion.textarea
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value.toUpperCase())}
              placeholder="Enter text to decrypt"
              className="w-full p-2 sm:p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 resize-none text-sm sm:text-base"
              rows="3"
              whileHover={{ scale: 1.01 }}
              whileFocus={{ scale: 1.02, borderColor: "rgb(107, 114, 128)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>
        )}

        {/* Key Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        >
          <motion.label 
            className="block text-xs sm:text-sm font-medium mb-2 text-gray-300"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Key
          </motion.label>
          <motion.input
            type="text"
            value={cipherKey}
            onChange={(e) => setCipherKey(e.target.value.toUpperCase())}
            placeholder="Enter encryption/decryption key"
            className="w-full p-2 sm:p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 text-sm sm:text-base"
            whileHover={{ scale: 1.01 }}
            whileFocus={{ scale: 1.02, borderColor: "rgb(107, 114, 128)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex gap-3 sm:gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        >
          <motion.button
            onClick={onSubmit}
            disabled={loading}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex-1 py-2 px-3 sm:px-4 bg-gray-700 text-white font-medium rounded-lg shadow-lg shadow-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? "Processing..." : operation === "encrypt" ? "Encrypt" : "Decrypt"}
          </motion.button>

          <motion.button
            onClick={onReset}
            disabled={loading}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="py-2 px-3 sm:px-4 bg-white/10 text-gray-300 font-medium rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Reset
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}