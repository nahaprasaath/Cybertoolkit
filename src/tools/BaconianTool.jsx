import ToolContainer from '../components/ToolContainer'
import { baconianEncode, baconianDecode } from '../utils/codecs'

export default function BaconianTool() {
  return (
    <ToolContainer
      title="Baconian Cipher"
      description="Encodes each letter as a 5-character sequence of A's and B's (or use 0/1 style if you swap them in manually)."
      actions={[
        { label: 'Encode', run: (input) => baconianEncode(input) },
        { label: 'Decode', run: (input) => baconianDecode(input) },
      ]}
    />
  )
}
