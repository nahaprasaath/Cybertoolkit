import ToolContainer from '../components/ToolContainer'
import { textToA1Z26, a1z26ToText } from '../utils/codecs'

export default function A1Z26Tool() {
  return (
    <ToolContainer
      title="A1Z26 (Letter ↔ Number)"
      description="Convert letters to their position in the alphabet (A=1 ... Z=26) or back. Numbers within a word are hyphen-separated."
      actions={[
        { label: 'Text → Numbers', run: (input) => textToA1Z26(input) },
        { label: 'Numbers → Text', run: (input) => a1z26ToText(input) },
      ]}
    />
  )
}
