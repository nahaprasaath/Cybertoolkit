import ToolContainer from '../components/ToolContainer'
import { xorEncode, xorDecode } from '../utils/codecs'

export default function XorTool() {
  return (
    <ToolContainer
      title="XOR Cipher"
      description="XORs each byte against a repeating key. Encoded output is shown as hex — feed that hex back in to decode."
      extraField={{ label: 'Key', placeholder: 'e.g. secret' }}
      actions={[
        { label: 'Encode', run: (input, extra) => xorEncode(input, extra) },
        { label: 'Decode (input = hex)', run: (input, extra) => xorDecode(input, extra) },
      ]}
    />
  )
}
