import ToolContainer from '../components/ToolContainer'
import { base32Encode, base32Decode } from '../utils/codecs'

export default function Base32Tool() {
  return (
    <ToolContainer
      title="Base32"
      description="Encode text to Base32 (RFC 4648), or decode a Base32 string back to text."
      actions={[
        { label: 'Encode', run: (input) => base32Encode(input) },
        { label: 'Decode', run: (input) => base32Decode(input) },
      ]}
    />
  )
}
