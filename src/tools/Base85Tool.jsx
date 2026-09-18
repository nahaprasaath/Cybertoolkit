import ToolContainer from '../components/ToolContainer'
import { base85Encode, base85Decode } from '../utils/codecs'

export default function Base85Tool() {
  return (
    <ToolContainer
      title="Base85 / ASCII85"
      description="Encode text to ASCII85 (the format used by Adobe/PostScript, wrapped in <~ ~>), or decode it back."
      actions={[
        { label: 'Encode', run: (input) => base85Encode(input) },
        { label: 'Decode', run: (input) => base85Decode(input) },
      ]}
    />
  )
}
