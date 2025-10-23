import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OperationSelector from "./components/OperationSelector";
import InputForm from "./components/InputForm";
import MatrixDisplay from "./components/MatrixDisplay";
import ResultsDisplay from "./components/ResultsDisplay";
import CursorGlow from "./components/CursorGlow";
import { generateMatrix, encrypt, decrypt } from "./utils/playfair";
import "./App.css";

export default function App() {
  const [operation, setOperation] = useState("encrypt");
  const [plaintext, setPlaintext] = useState("HELLO WORLD");
  const [ciphertext, setCiphertext] = useState("");
  const [cipherKey, setCipherKey] = useState("MONARCHY");
  const [matrix, setMatrix] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usePlaintextKey, setUsePlaintextKey] = useState(false);

  // Generate matrix when key changes
  useEffect(() => {
    try {
      setError("");
      const newMatrix = generateMatrix(cipherKey);
      setMatrix(newMatrix);
    } catch (err) {
      setError(err.message);
    }
  }, [cipherKey]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      let effectiveKey = cipherKey;

      // Handle plaintext-derived key
      if (usePlaintextKey && !cipherKey.trim()) {
        effectiveKey = plaintext.replace(/[^A-Z]/gi, "").toUpperCase();
        if (!effectiveKey) throw new Error("Plaintext must contain letters");
      } else if (!effectiveKey.trim()) {
        throw new Error("Key is required");
      }

      const newMatrix = generateMatrix(effectiveKey);
      setMatrix(newMatrix);

      let output;
      if (operation === "encrypt") {
        if (!plaintext.trim()) throw new Error("Plaintext is required");
        output = encrypt(plaintext, newMatrix);
      } else {
        if (!ciphertext.trim()) throw new Error("Ciphertext is required");
        output = decrypt(ciphertext, newMatrix);
      }

      setResult({
        input: operation === "encrypt" ? plaintext : ciphertext,
        output,
        type: operation,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlaintext("HELLO WORLD");
    setCiphertext("");
    setCipherKey("MONARCHY");
    setResult(null);
    setError("");
    setUsePlaintextKey(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      <CursorGlow />

      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-500 rounded-full opacity-20"
            animate={{
              y: [0, -100],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-glow">
            Playfair Cipher Explorer
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Encrypt and decrypt messages using the classic Playfair cipher
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-md text-red-200"
          >
            {error}
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Operation Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <OperationSelector
                operation={operation}
                setOperation={setOperation}
              />
            </motion.div>

            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <InputForm
                operation={operation}
                plaintext={plaintext}
                setPlaintext={setPlaintext}
                ciphertext={ciphertext}
                setCiphertext={setCiphertext}
                cipherKey={cipherKey}
                setCipherKey={setCipherKey}
                usePlaintextKey={usePlaintextKey}
                setUsePlaintextKey={setUsePlaintextKey}
                onSubmit={handleSubmit}
                onReset={handleReset}
                loading={loading}
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Matrix Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MatrixDisplay matrix={matrix} />
            </motion.div>

            {/* Results Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ResultsDisplay result={result} />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center py-6 text-gray-500 text-sm border-t border-white/10"
      >
        Built with React + Vite | Playfair Cipher Algorithm
      </motion.footer>
    </div>
  );
}
