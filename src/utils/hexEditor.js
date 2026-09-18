export function bytesToHexString(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}

export function hexStringToBytes(hex) {
  const clean = hex.trim().replace(/0x/gi, '').replace(/[\s,]+/g, '')
  if (clean.length === 0) return new Uint8Array(0)
  if (clean.length % 2 !== 0) throw new Error('Hex has an odd number of digits — every byte needs two hex characters')
  if (!/^[0-9a-fA-F]*$/.test(clean)) throw new Error('Hex contains non-hex characters')
  const bytes = new Uint8Array(clean.length / 2)
  for (let i = 0; i < clean.length; i += 2) bytes[i / 2] = parseInt(clean.slice(i, i + 2), 16)
  return bytes
}

export function formatHexDump(bytes, maxBytes = 4096) {
  const limit = Math.min(bytes.length, maxBytes)
  const lines = []
  for (let offset = 0; offset < limit; offset += 16) {
    const chunk = bytes.slice(offset, offset + 16)
    const hexPart = Array.from(chunk)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(' ')
      .padEnd(16 * 3 - 1, ' ')
    const asciiPart = Array.from(chunk)
      .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
      .join('')
    lines.push(`${offset.toString(16).padStart(8, '0')}  ${hexPart}  ${asciiPart}`)
  }
  let result = lines.length ? lines.join('\n') : '(empty)'
  if (bytes.length > maxBytes) {
    result += `\n… truncated — showing first ${maxBytes.toLocaleString()} of ${bytes.length.toLocaleString()} bytes`
  }
  return result
}
