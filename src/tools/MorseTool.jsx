import ToolContainer from '../components/ToolContainer'
import { textToMorse, morseToText } from '../utils/codecs'

export default function MorseTool() {
  return (
    <ToolContainer
      title="Morse Code"
      description="Convert text to Morse code (dots and dashes), or decode Morse back to text. Use spaces between letters and ' / ' between words."
      actions={[
        { label: 'Text → Morse', run: (input) => textToMorse(input) },
        { label: 'Morse → Text', run: (input) => morseToText(input) },
      ]}
    />
  )
}
