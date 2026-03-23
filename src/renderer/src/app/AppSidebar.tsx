import SidebarNav from './SidebarNav'
import type { IconFamily } from '../types/icon'

type View = 'dashboard' | 'assignments' | 'settings'

interface AppSidebarProps {
  view: View
  onViewChange: (view: View) => void
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
  iconFamily: IconFamily
  logoIcon: string
}

export default function AppSidebar({
  view,
  onViewChange,
  sidebarCollapsed,
  onToggleSidebar,
  iconFamily,
  logoIcon,
}: AppSidebarProps) {
  return (
    <nav className={`sidebar${sidebarCollapsed ? ' sidebar--collapsed' : ''}`}>
      <div className="app-brand">
        <img src={logoIcon} alt="Acadence" className="app-brand-logo" />
        <div className="app-brand-text">
          <div className="app-name">Acadence</div>
        </div>
      </div>

      <SidebarNav
        view={view}
        onViewChange={onViewChange}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={onToggleSidebar}
        iconFamily={iconFamily}
      />
    </nav>
  )
}
