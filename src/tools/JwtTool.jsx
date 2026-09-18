import ToolContainer from '../components/ToolContainer'
import { decodeJWT } from '../utils/jwt'

export default function JwtTool() {
  return (
    <ToolContainer
      title="JWT Decoder"
      description="Paste a JSON Web Token to see its decoded header and payload. This only decodes — it does not verify the signature, so a decoded token is not proof it's valid."
      actions={[{ label: 'Decode', run: (input) => decodeJWT(input) }]}
    />
  )
}
