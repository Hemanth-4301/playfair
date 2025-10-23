/**
 * Playfair Cipher Implementation
 * Classic encryption algorithm using a 5x5 matrix
 */

// Generate the 5x5 cipher matrix from a key
export function generateMatrix(key) {
  if (!key || typeof key !== "string") {
    throw new Error("Key must be a non-empty string")
  }

  // Clean key: uppercase, remove non-letters
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "")

  if (!cleanKey) {
    throw new Error("Key must contain at least one letter")
  }

  // Remove duplicates and combine I/J
  const seen = new Set()
  let uniqueKey = ""
  for (const char of cleanKey) {
    const normalized = char === "J" ? "I" : char
    if (!seen.has(normalized)) {
      seen.add(normalized)
      uniqueKey += normalized
    }
  }

  // Fill remaining alphabet (excluding J)
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ" // Note: no J
  for (const char of alphabet) {
    if (!seen.has(char)) {
      uniqueKey += char
    }
  }

  // Create 5x5 matrix
  const matrix = []
  for (let i = 0; i < 5; i++) {
    matrix.push(uniqueKey.slice(i * 5, (i + 1) * 5).split(""))
  }

  return matrix
}

// Prepare text for encryption: uppercase, remove non-letters, combine I/J
export function prepareText(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Text must be a non-empty string")
  }

  let cleaned = text.toUpperCase().replace(/[^A-Z]/g, "")
  cleaned = cleaned.replace(/J/g, "I")

  if (!cleaned) {
    throw new Error("Text must contain at least one letter")
  }

  return cleaned
}

// Split text into digraphs (pairs of letters)
export function createDigraphs(text) {
  const digraphs = []
  let i = 0

  while (i < text.length) {
    const first = text[i]
    let second = text[i + 1] || "X"

    // If both letters are the same, insert X
    if (first === second) {
      second = "X"
      i++
    } else {
      i += 2
    }

    // If we're at the end and only have one letter, pad with X
    if (i === text.length && text.length % 2 === 1) {
      second = "X"
    }

    digraphs.push(first + second)
  }

  // Ensure even number of letters
  if (text.length % 2 === 1) {
    digraphs[digraphs.length - 1] = digraphs[digraphs.length - 1][0] + "X"
  }

  return digraphs
}

// Find position of letter in matrix
export function findPosition(matrix, letter) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === letter) {
        return { row, col }
      }
    }
  }
  throw new Error(`Letter ${letter} not found in matrix`)
}

// Encrypt a digraph
function encryptDigraph(matrix, digraph) {
  const pos1 = findPosition(matrix, digraph[0])
  const pos2 = findPosition(matrix, digraph[1])

  let newPos1, newPos2

  if (pos1.row === pos2.row) {
    // Same row: shift right
    newPos1 = { row: pos1.row, col: (pos1.col + 1) % 5 }
    newPos2 = { row: pos2.row, col: (pos2.col + 1) % 5 }
  } else if (pos1.col === pos2.col) {
    // Same column: shift down
    newPos1 = { row: (pos1.row + 1) % 5, col: pos1.col }
    newPos2 = { row: (pos2.row + 1) % 5, col: pos2.col }
  } else {
    // Rectangle: swap columns
    newPos1 = { row: pos1.row, col: pos2.col }
    newPos2 = { row: pos2.row, col: pos1.col }
  }

  return matrix[newPos1.row][newPos1.col] + matrix[newPos2.row][newPos2.col]
}

// Decrypt a digraph
function decryptDigraph(matrix, digraph) {
  const pos1 = findPosition(matrix, digraph[0])
  const pos2 = findPosition(matrix, digraph[1])

  let newPos1, newPos2

  if (pos1.row === pos2.row) {
    // Same row: shift left
    newPos1 = { row: pos1.row, col: (pos1.col - 1 + 5) % 5 }
    newPos2 = { row: pos2.row, col: (pos2.col - 1 + 5) % 5 }
  } else if (pos1.col === pos2.col) {
    // Same column: shift up
    newPos1 = { row: (pos1.row - 1 + 5) % 5, col: pos1.col }
    newPos2 = { row: (pos2.row - 1 + 5) % 5, col: pos2.col }
  } else {
    // Rectangle: swap columns
    newPos1 = { row: pos1.row, col: pos2.col }
    newPos2 = { row: pos2.row, col: pos1.col }
  }

  return matrix[newPos1.row][newPos1.col] + matrix[newPos2.row][newPos2.col]
}

// Main encrypt function
export function encrypt(plaintext, matrix) {
  const prepared = prepareText(plaintext)
  const digraphs = createDigraphs(prepared)

  let ciphertext = ""
  for (const digraph of digraphs) {
    ciphertext += encryptDigraph(matrix, digraph)
  }

  return ciphertext
}

// Main decrypt function
export function decrypt(ciphertext, matrix) {
  const prepared = prepareText(ciphertext)
  const digraphs = createDigraphs(prepared)

  let plaintext = ""
  for (const digraph of digraphs) {
    plaintext += decryptDigraph(matrix, digraph)
  }

  return plaintext
}
