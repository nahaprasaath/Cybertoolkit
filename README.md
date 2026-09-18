# Vault — CTF Decode/Encode Toolkit

A small React app that bundles common CTF encode/decode tools (Base64, Base32,
Hex/Binary/Decimal↔ASCII, URL encoding, ROT13/Caesar, Vigenère, Morse) into
one site. Each tool is its own file, all logic runs client-side in the
browser — there's no server, so it's safe to host as a static GitHub Pages
site.

The header uses a small Three.js particle animation. It's purely decorative —
delete `src/components/Background3D.jsx` and its one usage in `App.jsx` and
nothing else breaks.

## Why there's no real "backend"

GitHub Pages only serves static files (HTML/CSS/JS) — it can't run server
code. So "backend file system" here means: everything (file reading, hex
dumping, encoding/decoding) happens in your browser via the File API. Nothing
is uploaded anywhere. If you later want a true backend (e.g. to handle very
large files, run heavier crypto, or persist history across devices), you'd
need a separate host like Render, Fly.io, or a Cloudflare Worker — GitHub
Pages can't do that part.

## Project structure

```
src/
  components/
    Sidebar.jsx          # left nav, grouped into "Tools" and "Reference Guides"
    ToolContainer.jsx     # shared input/output/actions UI every encode/decode tool uses
    ReferenceGuide.jsx    # shared renderer (headings/tables/code) every guide uses
    FileDrop.jsx          # drag-and-drop / click-to-upload file input
    Background3D.jsx      # decorative Three.js header animation
  tools/                 # 18 encode/decode tools, one file each
    Base64Tool.jsx, Base32Tool.jsx, Base85Tool.jsx, HexAsciiTool.jsx,
    UrlTool.jsx, RotCaesarTool.jsx, AtbashTool.jsx, A1Z26Tool.jsx,
    AffineTool.jsx, VigenereTool.jsx, RailFenceTool.jsx, PolybiusTool.jsx,
    BaconianTool.jsx, XorTool.jsx, MorseTool.jsx, ReverseTextTool.jsx,
    RsaTool.jsx, CipherIdentifierTool.jsx
  guides/                # 8 CTF reference guides, one file each
    NetworkAnalysisGuide.jsx    # Wireshark, tshark, tcpdump, Scapy
    ScanningReconGuide.jsx      # Nmap, common ports, IPv6
    MemoryForensicsGuide.jsx    # Volatility 3
    DiskForensicsGuide.jsx      # Autopsy / Sleuth Kit
    PasswordCrackingGuide.jsx   # John the Ripper, Hydra, hashcat, Ophcrack
    LogAnalysisGuide.jsx        # grep/strings/sort pipelines
    ClassicalCiphersGuide.jsx   # cipher theory reference table
    UnixCommandsGuide.jsx       # grep/awk/cut/find/strings/binwalk/netcat
  utils/
    codecs.js            # all encode/decode functions (pure JS)
    rsa.js               # BigInt RSA math
    frequency.js         # Index of Coincidence / letter frequency analysis
    fileReading.js        # reads uploaded files as text or hex
  App.jsx
  main.jsx
  index.css
```

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL (usually http://localhost:5173).

## Deploy to GitHub Pages

**Option A — GitHub Actions (recommended, auto-deploys on every push)**

1. Create a new GitHub repo and push this project to the `main` branch.
2. In `vite.config.js`, set `base: '/your-repo-name/'` (already set to
   `/toolvault/` — change it to match your actual repo name).
3. In your repo: Settings → Pages → Source → select **GitHub Actions**.
4. Push to `main`. The included workflow at
   `.github/workflows/deploy.yml` will build and deploy automatically.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

**Option B — manual deploy with `gh-pages`**

```bash
npm install
npm run deploy
```

This builds the site and pushes the `dist/` folder to a `gh-pages` branch,
which you then enable under Settings → Pages → Source → **Deploy from a
branch** → `gh-pages`.

## Adding another tool

1. Add an encode/decode function to `src/utils/codecs.js`.
2. Create `src/tools/YourTool.jsx` following the pattern in any existing tool
   file — it just needs to render `<ToolContainer>` with a title,
   description, and an `actions` array.
3. Register it in `src/App.jsx`'s `TOOLS` array so it shows up in the sidebar.

## Adding another reference guide

1. Create `src/guides/YourGuide.jsx` following the pattern in any existing
   guide file — it renders `<ReferenceGuide>` with a title, intro, and a
   `sections` array (each section can have a heading, paragraphs, a list, a
   table, and/or a code block).
2. Register it in `src/App.jsx`'s `GUIDES` array so it shows up in the
   sidebar under "CTF Reference Guides".
