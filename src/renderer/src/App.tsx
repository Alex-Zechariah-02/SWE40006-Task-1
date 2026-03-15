import { useEffect, useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import AssignmentsPage from './pages/AssignmentsPage'
import ThemesPage from './pages/ThemesPage'
import SettingsPage from './pages/SettingsPage'
import { loadTheme, saveTheme, applyTheme, type ThemeId } from './services/theme'

type View = 'dashboard' | 'assignments' | 'themes' | 'settings'
type Density = 'compact' | 'balanced' | 'spacious'

const DENSITY_KEY = 'acadence-density'

function loadDensity(): Density {
  try {
    const saved = localStorage.getItem(DENSITY_KEY)
    if (saved === 'compact') return 'compact'
    if (saved === 'balanced') return 'balanced'
    if (saved === 'spacious') return 'spacious'
    // Migrate old values from v0.6.0
    if (saved === 'comfortable') return 'spacious'
    // 'default' or anything unrecognised → 'balanced'
  } catch {
    // ignore
  }
  return 'balanced'
}

function App() {
  const [view, setView] = useState<View>('dashboard')
  const [density, setDensity] = useState<Density>(() => loadDensity())
  const [theme, setTheme] = useState<ThemeId>(() => loadTheme())

  // Apply density class to body
  useEffect(() => {
    const body = document.body
    body.classList.remove('density-compact', 'density-spacious')
    if (density === 'compact') body.classList.add('density-compact')
    if (density === 'spacious') body.classList.add('density-spacious')
    try {
      localStorage.setItem(DENSITY_KEY, density)
    } catch {
      // ignore
    }
  }, [density])

  // Apply and persist theme
  useEffect(() => {
    applyTheme(theme)
    saveTheme(theme)
  }, [theme])

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="app-brand">
          <div className="app-name">Acadence</div>
          <div className="app-tagline">Academic workspace</div>
        </div>

        <div className="nav-section">
          <div className="nav-section-label">Workspace</div>
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
            <li>
              <button
                className={view === 'themes' ? 'active' : ''}
                onClick={() => setView('themes')}
              >
                Themes
              </button>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <ul className="nav-links">
            <li>
              <button
                className={view === 'settings' ? 'active' : ''}
                onClick={() => setView('settings')}
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        {view === 'dashboard' && (
          <DashboardPage
            density={density}
            onDensityChange={setDensity}
            onNavigate={() => setView('assignments')}
            theme={theme}
            onThemeChange={setTheme}
          />
        )}
        {view === 'assignments' && <AssignmentsPage />}
        {view === 'themes' && <ThemesPage />}
        {view === 'settings' && (
          <SettingsPage
            density={density}
            onDensityChange={setDensity}
            theme={theme}
            onThemeChange={setTheme}
          />
        )}
      </main>
    </div>
  )
}

export default App
