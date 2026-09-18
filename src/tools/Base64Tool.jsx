import ToolContainer from '../components/ToolContainer'
import { base64Encode, base64Decode } from '../utils/codecs'

export default function Base64Tool() {
  return (
    <ToolContainer
      title="Base64"
      description="Encode text to Base64, or decode a Base64 string back to text."
      actions={[
        { label: 'Encode', run: (input) => base64Encode(input) },
        { label: 'Decode', run: (input) => base64Decode(input) },
      ]}
    />
  )
}
