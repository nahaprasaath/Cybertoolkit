export default function Sidebar({ groups, active, onSelect }) {
  return (
    <nav className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__mark">/vault</span>
        <span className="sidebar__sub">decode &amp; encode toolkit</span>
      </div>
      {groups.map((group) => (
        <div key={group.label} className="sidebar__group">
          <span className="sidebar__group-label">{group.label}</span>
          <ul className="sidebar__list">
            {group.tools.map((tool) => (
              <li key={tool.id}>
                <button
                  className={tool.id === active ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
                  onClick={() => onSelect(tool.id)}
                >
                  {tool.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
