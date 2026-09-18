// Reads a dropped/selected file client-side. Text-like files are loaded as
// plain text; anything else is loaded as a raw hex dump so it can still be
// fed into the Hex tool or copy-pasted elsewhere.
const TEXT_LIKE_EXT = /\.(txt|md|csv|json|xml|html?|js|jsx|ts|css|log|yml|yaml|py|c|cpp|java)$/i

export function readFileSmart(file) {
  return new Promise((resolve, reject) => {
    const looksTextual = file.type.startsWith('text/') || TEXT_LIKE_EXT.test(file.name) || file.type === ''
    const reader = new FileReader()

    reader.onerror = () => reject(reader.error)

    if (looksTextual && file.size < 2_000_000) {
      reader.onload = () => resolve({ content: reader.result, mode: 'text' })
      reader.readAsText(file)
    } else {
      reader.onload = () => {
        const bytes = new Uint8Array(reader.result)
        const hex = Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join(' ')
        resolve({ content: hex, mode: 'hex' })
      }
      reader.readAsArrayBuffer(file)
    }
  })
}
