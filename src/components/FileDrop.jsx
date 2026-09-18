import { useRef, useState } from 'react'
import { readFileSmart } from '../utils/fileReading'

export default function FileDrop({ onLoaded }) {
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState(null)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  async function handleFile(file) {
    if (!file) return
    setError(null)
    try {
      const { content, mode } = await readFileSmart(file)
      setFileName(file.name)
      onLoaded(content, mode)
    } catch (e) {
      setError('Could not read that file.')
    }
  }

  return (
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
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <span className="filedrop__label">
        {fileName ? `Loaded: ${fileName}` : 'Drop a file here, or click to browse'}
      </span>
      <span className="filedrop__hint">Any file type — text loads as-is, binaries load as a hex dump</span>
      {error && <span className="filedrop__error">{error}</span>}
    </div>
  )
}
