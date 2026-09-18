// MD5 is not available in the browser's native Web Crypto API, so it's
// implemented here in plain JS per RFC 1321. SHA-1/256/384/512 use the
// browser's built-in crypto.subtle instead of reinventing them.

const K = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
  0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
  0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
  0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
  0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
  0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
]
const S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
]

function leftRotate(x, c) {
  return ((x << c) | (x >>> (32 - c))) >>> 0
}

export function md5(message) {
  const msgBytes = new TextEncoder().encode(message)
  const bitLen = msgBytes.length * 8

  const data = Array.from(msgBytes)
  data.push(0x80)
  while (data.length % 64 !== 56) data.push(0)

  const lenLow = bitLen >>> 0
  const lenHigh = Math.floor(bitLen / 0x100000000) >>> 0
  for (let i = 0; i < 4; i++) data.push((lenLow >>> (8 * i)) & 0xff)
  for (let i = 0; i < 4; i++) data.push((lenHigh >>> (8 * i)) & 0xff)

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476

  for (let chunkStart = 0; chunkStart < data.length; chunkStart += 64) {
    const M = new Array(16)
    for (let j = 0; j < 16; j++) {
      const o = chunkStart + j * 4
      M[j] = (data[o] | (data[o + 1] << 8) | (data[o + 2] << 16) | (data[o + 3] << 24)) >>> 0
    }

    let A = a0, B = b0, C = c0, D = d0
    for (let i = 0; i < 64; i++) {
      let F, g
      if (i < 16) {
        F = (B & C) | (~B & D)
        g = i
      } else if (i < 32) {
        F = (D & B) | (~D & C)
        g = (5 * i + 1) % 16
      } else if (i < 48) {
        F = B ^ C ^ D
        g = (3 * i + 5) % 16
      } else {
        F = C ^ (B | ~D)
        g = (7 * i) % 16
      }
      F = (F + A + K[i] + M[g]) >>> 0
      A = D
      D = C
      C = B
      B = (B + leftRotate(F, S[i])) >>> 0
    }

    a0 = (a0 + A) >>> 0
    b0 = (b0 + B) >>> 0
    c0 = (c0 + C) >>> 0
    d0 = (d0 + D) >>> 0
  }

  const toHexLE = (n) => {
    let hex = ''
    for (let i = 0; i < 4; i++) hex += ((n >>> (8 * i)) & 0xff).toString(16).padStart(2, '0')
    return hex
  }
  return toHexLE(a0) + toHexLE(b0) + toHexLE(c0) + toHexLE(d0)
}

export async function webCryptoDigest(algo, message) {
  const data = new TextEncoder().encode(message)
  const digest = await crypto.subtle.digest(algo, data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export const sha1 = (str) => webCryptoDigest('SHA-1', str)
export const sha256 = (str) => webCryptoDigest('SHA-256', str)
export const sha512 = (str) => webCryptoDigest('SHA-512', str)
