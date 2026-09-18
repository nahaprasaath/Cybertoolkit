import { useState } from 'react'
import { rsaGenerateKeys, rsaEncrypt, rsaDecrypt } from '../utils/rsa'

export default function RsaTool() {
  const [p, setP] = useState('61')
  const [q, setQ] = useState('53')
  const [e, setE] = useState('17')
  const [keyError, setKeyError] = useState(null)
  const [keys, setKeys] = useState(null)

  const [n, setN] = useState('')
  const [dField, setDField] = useState('')
  const [eField, setEField] = useState('')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')
  const [runError, setRunError] = useState(null)

  function generateKeys() {
    setKeyError(null)
    try {
      const k = rsaGenerateKeys(p, q, e)
      setKeys(k)
      setN(k.n.toString())
      setEField(k.e.toString())
      setDField(k.d.toString())
    } catch (err) {
      setKeys(null)
      setKeyError(err.message)
    }
  }

  function encrypt() {
    setRunError(null)
    try {
      setResult(rsaEncrypt(message, n, eField))
    } catch (err) {
      setResult('')
      setRunError(err.message)
    }
  }

  function decrypt() {
    setRunError(null)
    try {
      setResult(rsaDecrypt(message, n, dField))
    } catch (err) {
      setResult('')
      setRunError(err.message)
    }
  }

  return (
    <section className="tool">
      <header className="tool__header">
        <h2>RSA Calculator</h2>
        <p>
          Small-number RSA for CTF-style problems. Give it two primes and a public exponent to
          derive n, φ(n), and d — or fill in n/e/d directly if you already have them from a
          challenge.
        </p>
      </header>

      <div className="tool__body">
        <div className="rsa__grid">
          <div>
            <label className="tool__label">p (prime)</label>
            <input className="rsa__input" value={p} onChange={(e) => setP(e.target.value)} />
          </div>
          <div>
            <label className="tool__label">q (prime)</label>
            <input className="rsa__input" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div>
            <label className="tool__label">e (public exponent)</label>
            <input className="rsa__input" value={e} onChange={(ev) => setE(ev.target.value)} placeholder="65537" />
          </div>
        </div>
        <div className="tool__actions">
          <button onClick={generateKeys}>Generate keys</button>
        </div>
        {keyError && <p className="tool__error">{keyError}</p>}
        {keys && (
          <pre className="rsa__keyblock">
{`n   = ${keys.n}
φ(n) = ${keys.phi}
e   = ${keys.e}
d   = ${keys.d}`}
          </pre>
        )}

        <hr className="rsa__divider" />

        <label className="tool__label" htmlFor="rsa-message">Message (text, or a number for raw ciphertext)</label>
        <textarea
          id="rsa-message"
          className="tool__textarea"
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
          placeholder="Plaintext to encrypt, or a ciphertext number to decrypt…"
          spellCheck={false}
        />

        <div className="rsa__grid">
          <div>
            <label className="tool__label">n</label>
            <input className="rsa__input" value={n} onChange={(ev) => setN(ev.target.value)} />
          </div>
          <div>
            <label className="tool__label">e (for encrypt)</label>
            <input className="rsa__input" value={eField} onChange={(ev) => setEField(ev.target.value)} />
          </div>
          <div>
            <label className="tool__label">d (for decrypt)</label>
            <input className="rsa__input" value={dField} onChange={(ev) => setDField(ev.target.value)} />
          </div>
        </div>

        <div className="tool__actions">
          <button onClick={encrypt}>Encrypt</button>
          <button onClick={decrypt}>Decrypt</button>
        </div>

        {runError && <p className="tool__error">{runError}</p>}

        <label className="tool__label">Result</label>
        <textarea className="tool__textarea tool__textarea--output" value={result} readOnly spellCheck={false} />
      </div>
    </section>
  )
}
