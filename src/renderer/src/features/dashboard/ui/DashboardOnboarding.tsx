import CustomSelect from '../../../components/controls/CustomSelect'
import type { ThemeId } from '../../../services/theme'

const THEME_OPTIONS = [
  { value: 'ledgerline', label: 'Ledgerline' },
  { value: 'vector-slate', label: 'Vector Slate' },
]

interface DashboardOnboardingProps {
  theme: ThemeId
  onThemeChange: (theme: ThemeId) => void
  onCreate: () => void
  onSkip: () => void
}

export default function DashboardOnboarding({
  theme,
  onThemeChange,
  onCreate,
  onSkip,
}: DashboardOnboardingProps) {
  return (
    <div className="dash-welcome">
      <div className="dash-welcome-heading">Acadence</div>
      <p className="dash-welcome-body">
        A focused workspace for managing your university assignments across
        every unit. Track deadlines, monitor progress, and stay on top of what
        matters.
      </p>
      <div style={{ marginBottom: 16 }}>
        <CustomSelect
          label="Theme"
          value={theme}
          onChange={(v) => onThemeChange(v as ThemeId)}
          options={THEME_OPTIONS}
          aria-label="Theme"
        />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary" onClick={onCreate}>
          Create your first assignment
        </button>
        <button className="btn btn-secondary" onClick={onSkip}>
          Skip for now
        </button>
      </div>
    </div>
  )
}
