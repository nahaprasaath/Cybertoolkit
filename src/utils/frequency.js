export function letterFrequency(str) {
  const counts = {}
  for (let i = 65; i <= 90; i++) counts[String.fromCharCode(i)] = 0
  let total = 0
  for (const ch of str.toUpperCase()) {
    if (ch >= 'A' && ch <= 'Z') {
      counts[ch]++
      total++
    }
  }
  return { counts, total }
}

export function indexOfCoincidence(counts, total) {
  if (total < 2) return 0
  let sum = 0
  for (const c of Object.values(counts)) sum += c * (c - 1)
  return sum / (total * (total - 1))
}

export function analyzeCipher(str) {
  const { counts, total } = letterFrequency(str)
  if (total === 0) throw new Error('No alphabetic characters found to analyze')

  const ic = indexOfCoincidence(counts, total)
  const sorted = Object.entries(counts)
    .map(([letter, count]) => [letter, count, (count / total) * 100])
    .sort((a, b) => b[1] - a[1])

  const table = sorted
    .filter(([, count]) => count > 0)
    .map(([letter, count, pct]) => `${letter}: ${String(count).padStart(3, ' ')}  (${pct.toFixed(1)}%)`)
    .join('\n')

  let guess
  if (ic >= 0.06) {
    guess =
      'Index of Coincidence is high (English-like, ~0.067). Likely plain English, a monoalphabetic cipher (Caesar, Atbash, general substitution), or a transposition cipher that just reorders letters without changing them (try Rail Fence).'
  } else if (ic <= 0.045) {
    guess =
      'Index of Coincidence is low (~random, ~0.038). Likely a polyalphabetic cipher (Vigenère), an XOR cipher, or genuinely random/compressed/encrypted data.'
  } else {
    guess =
      "Index of Coincidence is in between the two extremes — could be a short sample (IC is noisy on short text), a lightly-keyed cipher, or mixed content. Worth trying both the Caesar brute force and the Vigenère tool."
  }

  return {
    total,
    ic,
    table,
    guess,
    topLetters: sorted.slice(0, 5).map(([l]) => l).join(', '),
  }
}

export function analyzeToReport(str) {
  const r = analyzeCipher(str)
  return [
    `Letters analyzed: ${r.total}`,
    `Index of Coincidence: ${r.ic.toFixed(4)}  (plain English ≈ 0.067, random ≈ 0.038)`,
    `Most frequent letters: ${r.topLetters}  (English's are typically E, T, A, O, I, N)`,
    '',
    r.guess,
    '',
    'Full frequency table:',
    r.table,
  ].join('\n')
}
