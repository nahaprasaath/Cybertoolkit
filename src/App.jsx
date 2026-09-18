import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Background3D from './components/Background3D'
import Base64Tool from './tools/Base64Tool'
import Base32Tool from './tools/Base32Tool'
import HexAsciiTool from './tools/HexAsciiTool'
import UrlTool from './tools/UrlTool'
import RotCaesarTool from './tools/RotCaesarTool'
import VigenereTool from './tools/VigenereTool'
import MorseTool from './tools/MorseTool'
import AtbashTool from './tools/AtbashTool'
import A1Z26Tool from './tools/A1Z26Tool'
import AffineTool from './tools/AffineTool'
import RailFenceTool from './tools/RailFenceTool'
import PolybiusTool from './tools/PolybiusTool'
import BaconianTool from './tools/BaconianTool'
import XorTool from './tools/XorTool'
import Base85Tool from './tools/Base85Tool'
import ReverseTextTool from './tools/ReverseTextTool'
import RsaTool from './tools/RsaTool'
import CipherIdentifierTool from './tools/CipherIdentifierTool'
import HexEditorTool from './tools/HexEditorTool'
import HashGeneratorTool from './tools/HashGeneratorTool'
import JwtTool from './tools/JwtTool'
import NetworkAnalysisGuide from './guides/NetworkAnalysisGuide'
import ScanningReconGuide from './guides/ScanningReconGuide'
import MemoryForensicsGuide from './guides/MemoryForensicsGuide'
import DiskForensicsGuide from './guides/DiskForensicsGuide'
import PasswordCrackingGuide from './guides/PasswordCrackingGuide'
import LogAnalysisGuide from './guides/LogAnalysisGuide'
import ClassicalCiphersGuide from './guides/ClassicalCiphersGuide'
import UnixCommandsGuide from './guides/UnixCommandsGuide'

const TOOLS = [
  { id: 'identifier', label: 'Cipher Identifier', Component: CipherIdentifierTool },
  { id: 'base64', label: 'Base64', Component: Base64Tool },
  { id: 'base32', label: 'Base32', Component: Base32Tool },
  { id: 'base85', label: 'Base85 / ASCII85', Component: Base85Tool },
  { id: 'hex', label: 'Hex / Bin / Dec ↔ ASCII', Component: HexAsciiTool },
  { id: 'url', label: 'URL Encode / Decode', Component: UrlTool },
  { id: 'rot', label: 'ROT13 / Caesar', Component: RotCaesarTool },
  { id: 'atbash', label: 'Atbash', Component: AtbashTool },
  { id: 'a1z26', label: 'A1Z26', Component: A1Z26Tool },
  { id: 'affine', label: 'Affine Cipher', Component: AffineTool },
  { id: 'vigenere', label: 'Vigenère Cipher', Component: VigenereTool },
  { id: 'railfence', label: 'Rail Fence Cipher', Component: RailFenceTool },
  { id: 'polybius', label: 'Polybius Square', Component: PolybiusTool },
  { id: 'baconian', label: 'Baconian Cipher', Component: BaconianTool },
  { id: 'xor', label: 'XOR Cipher', Component: XorTool },
  { id: 'morse', label: 'Morse Code', Component: MorseTool },
  { id: 'reverse', label: 'Reverse Text', Component: ReverseTextTool },
  { id: 'rsa', label: 'RSA Calculator', Component: RsaTool },
]

const UTILITIES = [
  { id: 'hexeditor', label: 'Hex Editor', Component: HexEditorTool },
  { id: 'hashgen', label: 'Hash Generator', Component: HashGeneratorTool },
  { id: 'jwt', label: 'JWT Decoder', Component: JwtTool },
]

const GUIDES = [
  { id: 'guide-network', label: 'Network Traffic Analysis', Component: NetworkAnalysisGuide },
  { id: 'guide-scanning', label: 'Scanning & Recon', Component: ScanningReconGuide },
  { id: 'guide-memory', label: 'Memory Forensics', Component: MemoryForensicsGuide },
  { id: 'guide-disk', label: 'Disk & File Forensics', Component: DiskForensicsGuide },
  { id: 'guide-passwords', label: 'Password Cracking', Component: PasswordCrackingGuide },
  { id: 'guide-logs', label: 'Log & Artifact Analysis', Component: LogAnalysisGuide },
  { id: 'guide-ciphers', label: 'Classical Ciphers Reference', Component: ClassicalCiphersGuide },
  { id: 'guide-unix', label: 'Unix/Linux Cheat Sheet', Component: UnixCommandsGuide },
]

const GROUPS = [
  { label: 'Encode / Decode Tools', tools: TOOLS },
  { label: 'Analysis Utilities', tools: UTILITIES },
  { label: 'CTF Reference Guides', tools: GUIDES },
]

const ALL_TABS = [...TOOLS, ...UTILITIES, ...GUIDES]

export default function App() {
  const [active, setActive] = useState(TOOLS[0].id)
  const ActiveTool = ALL_TABS.find((t) => t.id === active)?.Component

  return (
    <div className="app">
      <header className="app__header">
        <Background3D />
        <div className="app__header-content">
          <h1>Vault</h1>
          <p>A pocket toolkit of decoders and encoders for CTFs — everything runs in your browser, nothing leaves your machine.</p>
        </div>
      </header>

      <div className="app__body">
        <Sidebar groups={GROUPS} active={active} onSelect={setActive} />
        <main className="app__main">{ActiveTool && <ActiveTool />}</main>
      </div>

     <footer className="app__footer">
        <span>© 2026 CYBERTOOLKIT</span>
        <span>BUILT FOR SECURITY RESEARCH & CTFs</span>
    </footer>

    </div>
  )
}
