import ThemeIcon from '../../../shared/ui/ThemeIcon'
import type { IconFamily } from '../../../types/icon'

export type SettingsTab = 'general' | 'appearance' | 'updates' | 'about'

const TABS: Array<{
  id: SettingsTab
  label: string
  iconName: 'sliders' | 'paint-brush' | 'refresh' | 'info'
}> = [
  { id: 'general', label: 'General', iconName: 'sliders' },
  { id: 'appearance', label: 'Appearance', iconName: 'paint-brush' },
  { id: 'updates', label: 'Updates', iconName: 'refresh' },
  { id: 'about', label: 'About', iconName: 'info' },
]

interface SettingsTabNavProps {
  activeTab: SettingsTab
  onChangeTab: (tab: SettingsTab) => void
  iconFamily: IconFamily
}

export default function SettingsTabNav({
  activeTab,
  onChangeTab,
  iconFamily,
}: SettingsTabNavProps) {
  return (
    <nav className="settings-tabs" aria-label="Settings sections">
      {TABS.map(({ id, label, iconName }) => (
        <button
          key={id}
          className={`settings-tab-btn${activeTab === id ? ' active' : ''}`}
          onClick={() => onChangeTab(id)}
          aria-current={activeTab === id ? 'page' : undefined}
        >
          <ThemeIcon
            name={iconName}
            family={iconFamily}
            size={15}
            weight="light"
          />
          {label}
        </button>
      ))}
    </nav>
  )
}
