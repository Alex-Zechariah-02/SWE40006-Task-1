import { useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import AssignmentsPage from './pages/AssignmentsPage'

type View = 'dashboard' | 'assignments'

function App() {
  const [view, setView] = useState<View>('dashboard')

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="app-brand">
          <div className="app-name">Acadence</div>
          <div className="app-tagline">Academic workspace</div>
        </div>
        <ul className="nav-links">
          <li>
            <button
              className={view === 'dashboard' ? 'active' : ''}
              onClick={() => setView('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={view === 'assignments' ? 'active' : ''}
              onClick={() => setView('assignments')}
            >
              Assignments
            </button>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {view === 'dashboard' && <DashboardPage />}
        {view === 'assignments' && <AssignmentsPage />}
      </main>
    </div>
  )
}

export default App
