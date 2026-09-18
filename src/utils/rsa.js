// Small-number RSA for learning/CTF use — BigInt so it isn't limited to
// 32-bit ints, but this is not production crypto (no real primality
// certainty for huge numbers, no padding scheme).

function gcdBig(a, b) {
  while (b > 0n) {
    ;[a, b] = [b, a % b]
  }
  return a
}

function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n]
  const [g, x1, y1] = egcd(b, a % b)
  return [g, y1, x1 - (a / b) * y1]
}

function modInverseBig(a, m) {
  const [g, x] = egcd(((a % m) + m) % m, m)
  if (g !== 1n) throw new Error('e and φ(n) are not coprime — pick a different e, or different p/q')
  return ((x % m) + m) % m
}

export function modPow(base, exp, mod) {
  if (mod === 1n) return 0n
  base = ((base % mod) + mod) % mod
  let result = 1n
  let e = exp
  while (e > 0n) {
    if (e & 1n) result = (result * base) % mod
    e >>= 1n
    base = (base * base) % mod
  }
  return result
}

// Trial-division primality check. Skips the check (and warns) above a size
// where trial division would hang the browser tab.
export function isPrime(n) {
  if (n < 2n) return false
  if (n < 4n) return true
  if (n % 2n === 0n) return false
  for (let i = 3n; i * i <= n; i += 2n) {
    if (n % i === 0n) return false
  }
  return true
}

const PRIMALITY_CHECK_LIMIT = 100_000_000n // ~1e8, trial division stays fast

export function rsaGenerateKeys(pStr, qStr, eStr) {
  const p = BigInt(pStr.trim())
  const q = BigInt(qStr.trim())
  const e = BigInt((eStr || '65537').trim())

  if (p < PRIMALITY_CHECK_LIMIT && !isPrime(p)) throw new Error(`${p} is not prime`)
  if (q < PRIMALITY_CHECK_LIMIT && !isPrime(q)) throw new Error(`${q} is not prime`)
  if (p === q) throw new Error('p and q must be different primes')

  const n = p * q
  const phi = (p - 1n) * (q - 1n)
  if (gcdBig(e, phi) !== 1n) throw new Error(`e=${e} is not coprime with φ(n)=${phi}; try a different e (65537, 17, 7, 3...)`)
  const d = modInverseBig(e, phi)

  return { n, phi, e, d }
}

export function textToBigInt(str) {
  const bytes = new TextEncoder().encode(str)
  let num = 0n
  for (const b of bytes) num = (num << 8n) + BigInt(b)
  return num
}

export function bigIntToTextMaybe(num) {
  try {
    if (num === 0n) return null
    const bytes = []
    let n = num
    while (n > 0n) {
      bytes.unshift(Number(n & 0xffn))
      n >>= 8n
    }
    const text = new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(bytes))
    // eslint-disable-next-line no-control-regex
    if (/^[\x20-\x7e]*$/.test(text)) return text
    return null
  } catch {
    return null
  }
}

export function rsaEncrypt(message, nStr, eStr) {
  const n = BigInt(nStr.trim())
  const e = BigInt(eStr.trim())
  const m = /^\d+$/.test(message.trim()) ? BigInt(message.trim()) : textToBigInt(message)
  if (m >= n) throw new Error('Message is too large for this key (must convert to a number smaller than n). Use bigger primes or shorter text.')
  return modPow(m, e, n).toString()
}

export function rsaDecrypt(cipherStr, nStr, dStr) {
  const n = BigInt(nStr.trim())
  const d = BigInt(dStr.trim())
  const c = BigInt(cipherStr.trim())
  const m = modPow(c, d, n)
  const asText = bigIntToTextMaybe(m)
  return asText ? `${m.toString()}\n\nAs text: ${asText}` : m.toString()
}
