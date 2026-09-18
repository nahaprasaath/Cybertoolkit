// Pure encode/decode functions. Each tool file imports what it needs.
// Kept dependency-free so it all runs client-side, no backend required.

// ---------- Base64 ----------
export function base64Encode(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return btoa(binary)
}
export function base64Decode(str) {
  const binary = atob(str.trim())
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

// ---------- Base32 (RFC 4648) ----------
const B32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
export function base32Encode(str) {
  const bytes = new TextEncoder().encode(str)
  let bits = ''
  bytes.forEach((b) => (bits += b.toString(2).padStart(8, '0')))
  let output = ''
  for (let i = 0; i < bits.length; i += 5) {
    let chunk = bits.slice(i, i + 5)
    if (chunk.length < 5) chunk = chunk.padEnd(5, '0')
    output += B32_ALPHABET[parseInt(chunk, 2)]
  }
  while (output.length % 8 !== 0) output += '='
  return output
}
export function base32Decode(str) {
  const clean = str.trim().toUpperCase().replace(/=+$/, '')
  let bits = ''
  for (const ch of clean) {
    const val = B32_ALPHABET.indexOf(ch)
    if (val === -1) throw new Error(`Invalid Base32 character: ${ch}`)
    bits += val.toString(2).padStart(5, '0')
  }
  const bytes = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2))
  }
  return new TextDecoder().decode(Uint8Array.from(bytes))
}

// ---------- Hex / Binary / Decimal / ASCII ----------
export function textToHex(str) {
  return Array.from(new TextEncoder().encode(str))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}
export function hexToText(hex) {
  const clean = hex.trim().replace(/0x/gi, '').replace(/[\s,]+/g, '')
  if (clean.length % 2 !== 0) throw new Error('Hex string has an odd number of digits')
  const bytes = []
  for (let i = 0; i < clean.length; i += 2) bytes.push(parseInt(clean.slice(i, i + 2), 16))
  return new TextDecoder().decode(Uint8Array.from(bytes))
}
export function textToBinary(str) {
  return Array.from(new TextEncoder().encode(str))
    .map((b) => b.toString(2).padStart(8, '0'))
    .join(' ')
}
export function binaryToText(bin) {
  const clean = bin.trim().split(/\s+/).join('')
  if (clean.length % 8 !== 0) throw new Error('Binary string length must be a multiple of 8')
  const bytes = []
  for (let i = 0; i < clean.length; i += 8) bytes.push(parseInt(clean.slice(i, i + 8), 2))
  return new TextDecoder().decode(Uint8Array.from(bytes))
}
export function textToDecimal(str) {
  return Array.from(new TextEncoder().encode(str)).join(' ')
}
export function decimalToText(dec) {
  const bytes = dec.trim().split(/\s+/).map((n) => parseInt(n, 10))
  return new TextDecoder().decode(Uint8Array.from(bytes))
}

// ---------- URL ----------
export function urlEncode(str) {
  return encodeURIComponent(str)
}
export function urlDecode(str) {
  return decodeURIComponent(str)
}

// ---------- ROT13 / Caesar ----------
export function caesarShift(str, shift) {
  const s = ((shift % 26) + 26) % 26
  return str.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= 'Z' ? 65 : 97
    return String.fromCharCode(((ch.charCodeAt(0) - base + s) % 26) + base)
  })
}

// ---------- Vigenere ----------
export function vigenere(str, key, decode = false) {
  if (!key) throw new Error('A key is required')
  const cleanKey = key.replace(/[^a-zA-Z]/g, '')
  if (!cleanKey) throw new Error('Key must contain letters')
  let ki = 0
  return str
    .split('')
    .map((ch) => {
      if (!/[a-zA-Z]/.test(ch)) return ch
      const base = ch <= 'Z' ? 65 : 97
      const keyCh = cleanKey[ki % cleanKey.length].toUpperCase()
      const keyShift = keyCh.charCodeAt(0) - 65
      const shift = decode ? -keyShift : keyShift
      ki++
      return String.fromCharCode(((ch.charCodeAt(0) - base + shift + 26) % 26) + base)
    })
    .join('')
}

// ---------- Caesar brute force (all 25 shifts) ----------
export function caesarBruteForce(str) {
  const lines = []
  for (let shift = 1; shift <= 25; shift++) {
    lines.push(`Shift ${String(shift).padStart(2, '0')}: ${caesarShift(str, shift)}`)
  }
  return lines.join('\n')
}

// ---------- Atbash ----------
export function atbash(str) {
  return str.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= 'Z' ? 65 : 97
    return String.fromCharCode(base + (25 - (ch.charCodeAt(0) - base)))
  })
}

// ---------- A1Z26 ----------
export function textToA1Z26(str) {
  return str
    .toUpperCase()
    .split(' ')
    .map((word) =>
      word
        .split('')
        .map((ch) => {
          if (/[A-Z]/.test(ch)) return String(ch.charCodeAt(0) - 64)
          return ch
        })
        .join('-')
    )
    .join(' ')
}
export function a1z26ToText(str) {
  return str
    .trim()
    .split(/\s+/)
    .map((word) =>
      word
        .split('-')
        .map((n) => {
          const num = parseInt(n, 10)
          return Number.isInteger(num) && num >= 1 && num <= 26
            ? String.fromCharCode(64 + num)
            : n
        })
        .join('')
    )
    .join(' ')
}

// ---------- Affine cipher ----------
// E(x) = (a*x + b) mod 26   — a must be coprime with 26
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b) }
function modInverse(a, m) {
  a = ((a % m) + m) % m
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x
  }
  throw new Error(`"a" must be coprime with 26 (try 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25)`)
}
export function affineEncode(str, aStr, bStr) {
  const a = parseInt(aStr, 10)
  const b = parseInt(bStr, 10)
  if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error('Provide both "a" and "b" as integers, e.g. "5,8"')
  if (gcd(a, 26) !== 1) throw new Error('"a" must be coprime with 26 (try 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25)')
  return str.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= 'Z' ? 65 : 97
    const x = ch.charCodeAt(0) - base
    return String.fromCharCode((((a * x + b) % 26) + 26) % 26 + base)
  })
}
export function affineDecode(str, aStr, bStr) {
  const a = parseInt(aStr, 10)
  const b = parseInt(bStr, 10)
  if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error('Provide both "a" and "b" as integers, e.g. "5,8"')
  const aInv = modInverse(a, 26)
  return str.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= 'Z' ? 65 : 97
    const y = ch.charCodeAt(0) - base
    return String.fromCharCode((((aInv * (y - b)) % 26) + 26 * 26) % 26 + base)
  })
}

// ---------- Rail Fence cipher ----------
export function railFenceEncode(str, railsStr) {
  const rails = parseInt(railsStr, 10)
  if (!Number.isInteger(rails) || rails < 2) throw new Error('Number of rails must be an integer ≥ 2')
  const fence = Array.from({ length: rails }, () => [])
  let rail = 0
  let dir = 1
  for (const ch of str) {
    fence[rail].push(ch)
    if (rail === 0) dir = 1
    else if (rail === rails - 1) dir = -1
    rail += dir
  }
  return fence.map((row) => row.join('')).join('')
}
export function railFenceDecode(str, railsStr) {
  const rails = parseInt(railsStr, 10)
  if (!Number.isInteger(rails) || rails < 2) throw new Error('Number of rails must be an integer ≥ 2')
  const len = str.length
  const pattern = []
  let rail = 0
  let dir = 1
  for (let i = 0; i < len; i++) {
    pattern.push(rail)
    if (rail === 0) dir = 1
    else if (rail === rails - 1) dir = -1
    rail += dir
  }
  const counts = Array(rails).fill(0)
  pattern.forEach((r) => counts[r]++)
  let idx = 0
  const rows = counts.map((c) => {
    const row = str.slice(idx, idx + c).split('')
    idx += c
    return row
  })
  const rowPointers = Array(rails).fill(0)
  return pattern.map((r) => rows[r][rowPointers[r]++]).join('')
}

// ---------- Polybius square (standard 5x5, I/J share a cell) ----------
const POLYBIUS_ALPHABET = 'ABCDEFGHIKLMNOPQRSTUVWXYZ' // no J
export function polybiusEncode(str) {
  return str
    .toUpperCase()
    .replace(/J/g, 'I')
    .split('')
    .map((ch) => {
      const idx = POLYBIUS_ALPHABET.indexOf(ch)
      if (idx === -1) return ch
      const row = Math.floor(idx / 5) + 1
      const col = (idx % 5) + 1
      return `${row}${col}`
    })
    .join(' ')
}
export function polybiusDecode(str) {
  return str
    .trim()
    .split(/\s+/)
    .map((pair) => {
      if (!/^[1-5]{2}$/.test(pair)) return pair
      const row = parseInt(pair[0], 10) - 1
      const col = parseInt(pair[1], 10) - 1
      return POLYBIUS_ALPHABET[row * 5 + col]
    })
    .join('')
}

// ---------- Baconian cipher ----------
const BACON_MAP = {
  A: 'AAAAA', B: 'AAAAB', C: 'AAABA', D: 'AAABB', E: 'AABAA', F: 'AABAB', G: 'AABBA', H: 'AABBB',
  I: 'ABAAA', J: 'ABAAB', K: 'ABABA', L: 'ABABB', M: 'ABBAA', N: 'ABBAB', O: 'ABBBA', P: 'ABBBB',
  Q: 'BAAAA', R: 'BAAAB', S: 'BAABA', T: 'BAABB', U: 'BABAA', V: 'BABAB', W: 'BABBA', X: 'BABBB',
  Y: 'BBAAA', Z: 'BBAAB',
}
const BACON_REVERSE = Object.fromEntries(Object.entries(BACON_MAP).map(([k, v]) => [v, k]))
export function baconianEncode(str) {
  return str
    .toUpperCase()
    .split('')
    .map((ch) => BACON_MAP[ch] ?? ch)
    .join(' ')
}
export function baconianDecode(str) {
  return str
    .trim()
    .split(/\s+/)
    .map((code) => BACON_REVERSE[code.toUpperCase()] ?? code)
    .join('')
}

// ---------- XOR cipher (key repeats; output shown as hex) ----------
export function xorEncode(str, key) {
  if (!key) throw new Error('A key is required')
  const bytes = new TextEncoder().encode(str)
  const keyBytes = new TextEncoder().encode(key)
  const out = bytes.map((b, i) => b ^ keyBytes[i % keyBytes.length])
  return Array.from(out).map((b) => b.toString(16).padStart(2, '0')).join(' ')
}
export function xorDecode(hexStr, key) {
  if (!key) throw new Error('A key is required')
  const clean = hexStr.trim().replace(/[\s,]+/g, '')
  if (clean.length % 2 !== 0) throw new Error('Hex input has an odd number of digits')
  const bytes = []
  for (let i = 0; i < clean.length; i += 2) bytes.push(parseInt(clean.slice(i, i + 2), 16))
  const keyBytes = new TextEncoder().encode(key)
  const out = bytes.map((b, i) => b ^ keyBytes[i % keyBytes.length])
  return new TextDecoder().decode(Uint8Array.from(out))
}

// ---------- Base85 / ASCII85 ----------
export function base85Encode(str) {
  const bytes = new TextEncoder().encode(str)
  let output = '<~'
  for (let i = 0; i < bytes.length; i += 4) {
    const chunk = bytes.slice(i, i + 4)
    const padCount = 4 - chunk.length
    const padded = new Uint8Array(4)
    padded.set(chunk)
    let value = (padded[0] << 24) + (padded[1] << 16) + (padded[2] << 8) + padded[3]
    value = value >>> 0
    if (value === 0 && padCount === 0) {
      output += 'z'
      continue
    }
    const chars = []
    for (let j = 0; j < 5; j++) {
      chars.unshift(String.fromCharCode((value % 85) + 33))
      value = Math.floor(value / 85)
    }
    output += chars.slice(0, 5 - padCount).join('')
  }
  return output + '~>'
}
export function base85Decode(str) {
  const clean = str.trim().replace(/^<~/, '').replace(/~>$/, '')
  const bytes = []
  let group = []
  for (const ch of clean) {
    if (ch === 'z' && group.length === 0) {
      bytes.push(0, 0, 0, 0)
      continue
    }
    group.push(ch.charCodeAt(0) - 33)
    if (group.length === 5) {
      let value = 0
      for (const g of group) value = value * 85 + g
      bytes.push((value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff)
      group = []
    }
  }
  if (group.length > 0) {
    const padCount = 5 - group.length
    while (group.length < 5) group.push(84)
    let value = 0
    for (const g of group) value = value * 85 + g
    const chunkBytes = [(value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff]
    bytes.push(...chunkBytes.slice(0, 4 - padCount))
  }
  return new TextDecoder().decode(Uint8Array.from(bytes))
}

// ---------- Reverse text ----------
export function reverseText(str) {
  return str.split('').reverse().join('')
}

// ---------- Morse ----------
const MORSE_MAP = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
}
const MORSE_REVERSE = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]))
export function textToMorse(str) {
  return str
    .toUpperCase()
    .split(' ')
    .map((word) =>
      word
        .split('')
        .map((ch) => MORSE_MAP[ch] ?? '')
        .filter(Boolean)
        .join(' ')
    )
    .join(' / ')
}
export function morseToText(morse) {
  return morse
    .trim()
    .split(' / ')
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => MORSE_REVERSE[code] ?? '')
        .join('')
    )
    .join(' ')
}
