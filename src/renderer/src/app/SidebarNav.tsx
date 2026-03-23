import ThemeIcon from '../shared/ui/ThemeIcon'
import type { IconFamily } from '../types/icon'

type View = 'dashboard' | 'assignments' | 'settings'

interface SidebarNavProps {
  view: View
  onViewChange: (view: View) => void
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
  iconFamily: IconFamily
}

export default function SidebarNav({
  view,
  onViewChange,
  sidebarCollapsed,
  onToggleSidebar,
  iconFamily,
}: SidebarNavProps) {
  return (
    <>
      <div className="nav-section">
        {!sidebarCollapsed && (
          <div className="nav-section-label">Workspace</div>
        )}
        <ul className="nav-links">
          <li>
            <button
              className={view === 'dashboard' ? 'active' : ''}
              onClick={() => onViewChange('dashboard')}
              title="Dashboard"
              aria-label="Dashboard"
            >
              <ThemeIcon
                name="home"
                family={iconFamily}
                size={18}
                weight="light"
              />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>
          </li>
          <li>
            <button
              className={view === 'assignments' ? 'active' : ''}
              onClick={() => onViewChange('assignments')}
              title="Assignments"
              aria-label="Assignments"
            >
              <ThemeIcon
                name="clipboard"
                family={iconFamily}
                size={18}
                weight="light"
              />
              {!sidebarCollapsed && <span>Assignments</span>}
            </button>
          </li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <ul className="nav-links">
          <li>
            <button
              className={view === 'settings' ? 'active' : ''}
              onClick={() => onViewChange('settings')}
              title="Settings"
              aria-label="Settings"
            >
              <ThemeIcon
                name="gear"
                family={iconFamily}
                size={18}
                weight="light"
              />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
          </li>
          <li>
            <button
              onClick={onToggleSidebar}
              aria-label={
                sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
              }
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ThemeIcon
                name={sidebarCollapsed ? 'caret-right' : 'caret-left'}
                family={iconFamily}
                size={18}
                weight="bold"
              />
              {!sidebarCollapsed && <span>Collapse</span>}
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
