// Shared layout for reference guides. Each guide file (in src/guides/) just
// supplies data — title, intro, and a list of sections — and this component
// handles rendering headings, prose, tables, and code blocks consistently.

function CodeBlock({ code }) {
  return (
    <pre className="guide__code">
      <code>{code}</code>
    </pre>
  )
}

function RefTable({ headers, rows }) {
  return (
    <div className="guide__table-wrap">
      <table className="guide__table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ReferenceGuide({ title, intro, sections }) {
  return (
    <section className="tool guide">
      <header className="tool__header">
        <h2>{title}</h2>
        <p>{intro}</p>
      </header>

      <div className="guide__body">
        {sections.map((section, i) => (
          <div className="guide__section" key={i}>
            {section.heading && <h3>{section.heading}</h3>}
            {section.paragraphs?.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
            {section.table && <RefTable {...section.table} />}
            {section.code && <CodeBlock code={section.code} />}
          </div>
        ))}
      </div>
    </section>
  )
}
