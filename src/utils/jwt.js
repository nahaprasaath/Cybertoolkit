function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) base64 += '='
  const binary = atob(base64)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function decodeJWT(token) {
  const parts = token.trim().split('.')
  if (parts.length < 2) throw new Error("That doesn't look like a JWT (expected header.payload.signature)")

  let header, payload
  try {
    header = JSON.parse(base64UrlDecode(parts[0]))
  } catch {
    throw new Error("Couldn't decode/parse the header segment as JSON")
  }
  try {
    payload = JSON.parse(base64UrlDecode(parts[1]))
  } catch {
    throw new Error("Couldn't decode/parse the payload segment as JSON")
  }

  const sigNote = parts[2]
    ? `Signature segment present (${parts[2].length} base64url characters) — NOT verified here, this is a decoder only.`
    : 'No signature segment present (unsigned token, e.g. alg: none).'

  return `Header:\n${JSON.stringify(header, null, 2)}\n\nPayload:\n${JSON.stringify(payload, null, 2)}\n\n${sigNote}`
}
