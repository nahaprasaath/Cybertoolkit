import ToolContainer from '../components/ToolContainer'
import { urlEncode, urlDecode } from '../utils/codecs'

export default function UrlTool() {
  return (
    <ToolContainer
      title="URL Encode / Decode"
      description="Percent-encode text for safe use in a URL, or decode a percent-encoded string."
      actions={[
        { label: 'Encode', run: (input) => urlEncode(input) },
        { label: 'Decode', run: (input) => urlDecode(input) },
      ]}
    />
  )
}
