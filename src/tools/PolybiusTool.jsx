import ToolContainer from '../components/ToolContainer'
import { polybiusEncode, polybiusDecode } from '../utils/codecs'

export default function PolybiusTool() {
  return (
    <ToolContainer
      title="Polybius Square"
      description="Standard 5×5 grid (I and J share a cell). Encodes each letter as a row-column pair, e.g. HELLO → 23 15 31 31 34."
      actions={[
        { label: 'Encode', run: (input) => polybiusEncode(input) },
        { label: 'Decode', run: (input) => polybiusDecode(input) },
      ]}
    />
  )
}
