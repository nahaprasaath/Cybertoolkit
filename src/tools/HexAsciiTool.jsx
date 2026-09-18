import ToolContainer from '../components/ToolContainer'
import { textToHex, hexToText, textToBinary, binaryToText, textToDecimal, decimalToText } from '../utils/codecs'

export default function HexAsciiTool() {
  return (
    <ToolContainer
      title="Hex / Binary / Decimal ↔ ASCII"
      description="Convert plain text to hex, binary, or decimal byte values — or convert any of those back to text."
      actions={[
        { label: 'Text → Hex', run: (input) => textToHex(input) },
        { label: 'Hex → Text', run: (input) => hexToText(input) },
        { label: 'Text → Binary', run: (input) => textToBinary(input) },
        { label: 'Binary → Text', run: (input) => binaryToText(input) },
        { label: 'Text → Decimal', run: (input) => textToDecimal(input) },
        { label: 'Decimal → Text', run: (input) => decimalToText(input) },
      ]}
    />
  )
}
