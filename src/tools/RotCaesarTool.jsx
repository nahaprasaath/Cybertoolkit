import ToolContainer from '../components/ToolContainer'
import { caesarShift, caesarBruteForce } from '../utils/codecs'

export default function RotCaesarTool() {
  return (
    <ToolContainer
      title="ROT13 / Caesar Shift"
      description="Shift letters by a fixed amount. Leave the shift blank for classic ROT13 (shift 13). Don't know the shift? Use Brute Force to see all 25 at once."
      extraField={{ label: 'Shift (0–25, default 13) — ignored by Brute Force', placeholder: '13' }}
      actions={[
        {
          label: 'Shift forward',
          run: (input, extra) => caesarShift(input, extra ? parseInt(extra, 10) : 13),
        },
        {
          label: 'Shift back',
          run: (input, extra) => caesarShift(input, -(extra ? parseInt(extra, 10) : 13)),
        },
        {
          label: 'Brute force (all shifts)',
          run: (input) => caesarBruteForce(input),
        },
      ]}
    />
  )
}
