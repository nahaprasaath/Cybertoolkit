import ReferenceGuide from '../components/ReferenceGuide'

export default function ClassicalCiphersGuide() {
  return (
    <ReferenceGuide
      title="Classical Ciphers Quick Reference"
      intro="How each cipher works — all of these are implemented as live encode/decode tools elsewhere in this site."
      sections={[
        {
          table: {
            headers: ['Cipher', 'Idea', 'Example'],
            rows: [
              ['Caesar / ROT-N', 'Shift every letter by a fixed amount k: C = (P + k) mod 26', 'Shift 3: ATTACK → DWWDFN'],
              ['Atbash', 'Mirror the alphabet: A↔Z, B↔Y, C↔X...', 'HELLO → SVOOL'],
              ['Rail Fence', 'Write the message in a zigzag across N rows, read row by row', '3 rails, HELLOWORLD → HOLELWRDLO'],
              ['Vigenère', 'Like Caesar, but the shift comes from a repeating keyword: C = (P + K) mod 26', 'Key CAT, HELLO → JEENO'],
              ['A1Z26', "Letter → its alphabet position", 'CAT → 3-1-20'],
              ['T9', 'Old phone keypad mapping (2={A,B,C}, 3={D,E,F}, ...)', 'CAT → 2-2-8'],
              ['Affine', 'C = (a·x + b) mod 26, a must be coprime with 26', 'See the Affine Cipher tool for worked math'],
              ['Polybius Square', '5×5 grid (I/J share a cell), each letter → row+col pair', 'HELLO → 23 15 31 31 34'],
              ['Baconian', 'Each letter → a 5-character A/B sequence', 'A → AAAAA, B → AAAAB'],
            ],
          },
        },
        {
          heading: 'Which one am I looking at?',
          paragraphs: [
            'For unknown or mixed ciphertext, run it through the Cipher Identifier tool first (Index of Coincidence) to get a read on whether you\'re looking at a monoalphabetic cipher, a transposition, or something polyalphabetic/random — that tells you which tool above to try next.',
          ],
        },
      ]}
    />
  )
}
