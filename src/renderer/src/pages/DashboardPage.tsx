import type { ThemeId } from '../services/theme'
import type { IconFamily } from '../types/icon'
import DashboardView from '../features/dashboard/ui/DashboardView'

interface DashboardPageProps {
  onNavigate: () => void
  theme: ThemeId
  onThemeChange: (theme: ThemeId) => void
  iconFamily: IconFamily
}

export default function DashboardPage({
  onNavigate,
  theme,
  onThemeChange,
  iconFamily,
}: DashboardPageProps) {
  return (
    <DashboardView
      onNavigate={onNavigate}
      theme={theme}
      onThemeChange={onThemeChange}
      iconFamily={iconFamily}
    />
  )
}
