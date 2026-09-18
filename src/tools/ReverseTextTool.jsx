import ToolContainer from '../components/ToolContainer'
import { reverseText } from '../utils/codecs'

export default function ReverseTextTool() {
  return (
    <ToolContainer
      title="Reverse Text"
      description="Flips a string back to front — useful for spotting reversed flags or strings."
      actions={[{ label: 'Reverse', run: (input) => reverseText(input) }]}
    />
  )
}
