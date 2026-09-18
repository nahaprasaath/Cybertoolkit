import ToolContainer from '../components/ToolContainer'
import { atbash } from '../utils/codecs'

export default function AtbashTool() {
  return (
    <ToolContainer
      title="Atbash Cipher"
      description="Mirrors the alphabet (A↔Z, B↔Y, ...). Encoding and decoding are the same operation."
      actions={[{ label: 'Encode / Decode', run: (input) => atbash(input) }]}
    />
  )
}
