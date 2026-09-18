import ToolContainer from '../components/ToolContainer'
import { vigenere } from '../utils/codecs'

export default function VigenereTool() {
  return (
    <ToolContainer
      title="Vigenère Cipher"
      description="Encode or decode text with a Vigenère cipher using a keyword."
      extraField={{ label: 'Key', placeholder: 'e.g. SHIELD' }}
      actions={[
        { label: 'Encode', run: (input, extra) => vigenere(input, extra, false) },
        { label: 'Decode', run: (input, extra) => vigenere(input, extra, true) },
      ]}
    />
  )
}
