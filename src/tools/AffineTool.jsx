import ToolContainer from '../components/ToolContainer'
import { affineEncode, affineDecode } from '../utils/codecs'

function parseAB(extra) {
  const [a, b] = extra.split(',').map((s) => s.trim())
  return [a, b]
}

export default function AffineTool() {
  return (
    <ToolContainer
      title="Affine Cipher"
      description="Uses E(x) = (a·x + b) mod 26. Enter a and b as 'a,b', e.g. '5,8'. 'a' must be coprime with 26."
      extraField={{ label: 'Keys: a,b', placeholder: '5,8' }}
      actions={[
        {
          label: 'Encode',
          run: (input, extra) => {
            const [a, b] = parseAB(extra || '')
            return affineEncode(input, a, b)
          },
        },
        {
          label: 'Decode',
          run: (input, extra) => {
            const [a, b] = parseAB(extra || '')
            return affineDecode(input, a, b)
          },
        },
      ]}
    />
  )
}
