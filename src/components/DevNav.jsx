import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

const pages = [
  { label: 'First Page', path: '/' },
  { label: 'Quiz Page', path: '/assessment' },
  { label: 'Loading', path: '/loading' },
  { label: 'Form Page', path: '/form' },
  { label: 'Rank AI Results', path: '/result/rank-ai' },
  { label: 'AI Receptionist Results', path: '/result/ai-receptionist' },
  { label: 'Rank AI Thank You', path: '/thank-you/rank-ai' },
  { label: 'AI Receptionist Thank You', path: '/thank-you/ai-receptionist' },
]

export default function DevNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="dev-nav-container">
      <button
        className="dev-nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Page Navigator"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      {isOpen && (
        <div className="dev-nav-panel">
          <div className="dev-nav-title">Page Navigator</div>
          {pages.map(page => (
            <button
              key={page.path}
              className={`dev-nav-btn ${location.pathname === page.path ? 'active' : ''}`}
              onClick={() => {
                navigate(page.path)
                setIsOpen(false)
              }}
            >
              {page.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
