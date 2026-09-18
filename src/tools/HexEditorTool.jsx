import { useRef, useState } from 'react'
import { bytesToHexString, hexStringToBytes, formatHexDump } from '../utils/hexEditor'

export default function HexEditorTool() {
  const [fileName, setFileName] = useState(null)
  const [hexText, setHexText] = useState('')
  const [dump, setDump] = useState('')
  const [error, setError] = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  function handleFile(file) {
    if (!file) return
    setError(null)
    const reader = new FileReader()
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result)
      setFileName(file.name)
      const hex = bytesToHexString(bytes)
      setHexText(hex)
      setDump(formatHexDump(bytes))
    }
    reader.onerror = () => setError('Could not read that file.')
    reader.readAsArrayBuffer(file)
  }

  function refreshDump() {
    setError(null)
    try {
      setDump(formatHexDump(hexStringToBytes(hexText)))
    } catch (e) {
      setError(e.message)
    }
  }

  function downloadFile() {
    setError(null)
    try {
      const bytes = hexStringToBytes(hexText)
      const blob = new Blob([bytes])
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName ? `edited-${fileName}` : 'edited.bin'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <section className="tool">
      <header className="tool__header">
        <h2>Hex Editor</h2>
        <p>
          Load any file to view and edit its raw bytes as hex, then download the result. Everything
          runs in your browser — nothing is uploaded anywhere.
        </p>
      </header>

      <div className="tool__body">
        <div
          className={`filedrop ${dragging ? 'filedrop--active' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            handleFile(e.dataTransfer.files?.[0])
          }}
        >
          <input ref={inputRef} type="file" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
          <span className="filedrop__label">
            {fileName ? `Loaded: ${fileName}` : 'Drop a file here, or click to browse'}
          </span>
          <span className="filedrop__hint">Any file type — loaded as raw bytes for editing</span>
        </div>

        <label className="tool__label" htmlFor="hexeditor-hex">
          Hex bytes (editable)
        </label>
        <textarea
          id="hexeditor-hex"
          className="tool__textarea"
          value={hexText}
          onChange={(e) => setHexText(e.target.value)}
          placeholder="Load a file above, or paste hex bytes directly (e.g. 48 65 6c 6c 6f)"
          spellCheck={false}
        />

        <div className="tool__actions">
          <button onClick={refreshDump}>Update dump</button>
          <button onClick={downloadFile}>Download as file</button>
        </div>

        {error && <p className="tool__error">{error}</p>}

        <label className="tool__label">Hex + ASCII dump</label>
        <pre className="guide__code">
          <code>{dump || 'Load a file, or edit the hex above and click "Update dump".'}</code>
        </pre>
      </div>
    </section>
  )
}
