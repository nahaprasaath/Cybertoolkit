import ToolContainer from '../components/ToolContainer'
import { railFenceEncode, railFenceDecode } from '../utils/codecs'

export default function RailFenceTool() {
  return (
    <ToolContainer
      title="Rail Fence Cipher"
      description="A transposition cipher that zigzags text across a number of 'rails'. Specify how many rails were used."
      extraField={{ label: 'Number of rails', placeholder: '3' }}
      actions={[
        { label: 'Encode', run: (input, extra) => railFenceEncode(input, extra || '3') },
        { label: 'Decode', run: (input, extra) => railFenceDecode(input, extra || '3') },
      ]}
    />
  )
}
