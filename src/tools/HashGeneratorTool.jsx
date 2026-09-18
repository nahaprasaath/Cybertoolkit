import ToolContainer from '../components/ToolContainer'
import { md5, sha1, sha256, sha512 } from '../utils/hash'

export default function HashGeneratorTool() {
  return (
    <ToolContainer
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, or SHA-512 hashes of text input. Runs entirely in your browser."
      actions={[
        { label: 'MD5', run: (input) => md5(input) },
        { label: 'SHA-1', run: (input) => sha1(input) },
        { label: 'SHA-256', run: (input) => sha256(input) },
        { label: 'SHA-512', run: (input) => sha512(input) },
      ]}
    />
  )
}
