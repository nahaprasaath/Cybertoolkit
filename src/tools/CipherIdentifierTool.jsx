import ToolContainer from '../components/ToolContainer'
import { analyzeToReport } from '../utils/frequency'

export default function CipherIdentifierTool() {
  return (
    <ToolContainer
      title="Cipher Identifier (Frequency Analysis)"
      description="Paste ciphertext to get a letter-frequency breakdown and an Index of Coincidence — a rough signal for whether you're looking at a substitution/transposition cipher or something more randomized like Vigenère or XOR."
      actions={[{ label: 'Analyze', run: (input) => analyzeToReport(input) }]}
    />
  )
}
