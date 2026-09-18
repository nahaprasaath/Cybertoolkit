import { useState } from 'react'
import FileDrop from './FileDrop'

/**
 * A single self-contained tool "container".
 *
 * Props:
 * - title, description: shown in the header
 * - actions: [{ label, run(input, extra) => string }]   e.g. Encode / Decode
 * - extraField: optional { label, placeholder } for tools needing a key/shift (Vigenere, Caesar)
 */
export default function ToolContainer({ title, description, actions, extraField }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [extra, setExtra] = useState('')
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  async function run(action) {
    setError(null)
    try {
      const result = await action.run(input, extra)
      setOutput(result)
    } catch (e) {
      setOutput('')
      setError(e.message || 'Something went wrong processing that input.')
    }
  }

  function copyOutput() {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <section className="tool">
      <header className="tool__header">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>

      <div className="tool__body">
        <label className="tool__label" htmlFor={`${title}-input`}>Input</label>
        <textarea
          id={`${title}-input`}
          className="tool__textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text here, or drop a file below…"
          spellCheck={false}
        />

        <FileDrop onLoaded={(content) => setInput(content)} />

        {extraField && (
          <div className="tool__extra">
            <label htmlFor={`${title}-extra`}>{extraField.label}</label>
            <input
              id={`${title}-extra`}
              type="text"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              placeholder={extraField.placeholder}
            />
          </div>
        )}

        <div className="tool__actions">
          {actions.map((action) => (
            <button key={action.label} onClick={() => run(action)}>
              {action.label}
            </button>
          ))}
        </div>

        {error && <p className="tool__error">{error}</p>}

        <label className="tool__label" htmlFor={`${title}-output`}>Output</label>
        <textarea
          id={`${title}-output`}
          className="tool__textarea tool__textarea--output"
          value={output}
          readOnly
          spellCheck={false}
        />
        <button className="tool__copy" onClick={copyOutput} disabled={!output}>
          {copied ? 'Copied' : 'Copy output'}
        </button>
      </div>
    </section>
  )
}
