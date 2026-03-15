import { useState } from 'react'
import type { Assignment } from '../types/assignment'
import { loadAssignments } from '../services/storage'
import ErrorBanner from '../components/ErrorBanner'
import type { ThemeId } from '../services/theme'
import {
  isOverdue,
  isDueSoon,
  isDueThisWeek,
  formatDate,
  daysUntilDue
} from '../services/date'

function DueSoonLabel({ dateStr }: { dateStr: string }) {
  const days = daysUntilDue(dateStr)
  if (days === null) return null
  if (days === 0) return <span className="due-label due-today">Today</span>
  if (days === 1) return <span className="due-label due-soon">Tomorrow</span>
  return <span className="due-label due-soon">In {days} days</span>
}

interface WidgetProps {
  title: string
  count: number
  accent: 'red' | 'amber' | 'blue' | 'green' | 'neutral'
  children: React.ReactNode
}

function DashboardWidget({ title, count, accent, children }: WidgetProps) {
  return (
    <section className={`dash-widget dash-widget--${accent}`}>
      <header className="dash-widget-header">
        <span className="dash-widget-title">{title}</span>
        <span className="dash-widget-count">{count}</span>
      </header>
      <div className="dash-widget-body">{children}</div>
    </section>
  )
}

interface AssignmentRowProps {
  assignment: Assignment
  label?: React.ReactNode
}

function DashAssignmentRow({ assignment: a, label }: AssignmentRowProps) {
  return (
    <div className="dash-assignment-row">
      <div className="dash-assignment-meta">
        <span className="dash-assignment-title">{a.title}</span>
        {a.unit && <span className="dash-assignment-unit">{a.unit}</span>}
      </div>
      <div className="dash-assignment-right">
        {label}
        <span className="dash-assignment-due">{formatDate(a.dueDate)}</span>
      </div>
    </div>
  )
}

function EmptyWidgetState({ message }: { message: string }) {
  return <p className="dash-widget-empty">{message}</p>
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div className="dash-progress-wrap">
      <div className="dash-progress-bar">
        <div className="dash-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="dash-progress-label">
        {value} of {max} completed ({pct}%)
      </span>
    </div>
  )
}

type Density = 'compact' | 'balanced' | 'spacious'

interface DashboardPageProps {
  density: Density
  onDensityChange: (density: Density) => void
  onNavigate: () => void
  theme: ThemeId
  onThemeChange: (theme: ThemeId) => void
}

const ONBOARDED_KEY = 'acadence-onboarded'

function isOnboarded(): boolean {
  try {
    return localStorage.getItem(ONBOARDED_KEY) === '1'
  } catch {
    return false
  }
}

function markOnboarded(): void {
  try {
    localStorage.setItem(ONBOARDED_KEY, '1')
  } catch {
    // ignore
  }
}

export default function DashboardPage({ density, onDensityChange, onNavigate, theme, onThemeChange }: DashboardPageProps) {
  const [loadResult] = useState(() => loadAssignments())
  const [loadError, setLoadError] = useState<string | null>(loadResult.error)
  const assignments: Assignment[] = loadResult.data
  const [onboarded, setOnboarded] = useState(isOnboarded)

  const overdue = assignments.filter((a) => isOverdue(a.dueDate, a.status))
  const dueSoon = assignments.filter((a) => isDueSoon(a.dueDate, a.status, 3))
  const thisWeek = assignments.filter((a) => isDueThisWeek(a.dueDate, a.status))
  const completed = assignments.filter((a) => a.status === 'Completed')
  const total = assignments.length

  const hasAny = total > 0

  function handleSkip() {
    markOnboarded()
    setOnboarded(true)
  }

  function handleCreate() {
    markOnboarded()
    setOnboarded(true)
    onNavigate()
  }

  // First-launch welcome state: no assignments AND not yet onboarded
  if (!hasAny && !onboarded) {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: 20 }}>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Your academic workspace at a glance</p>
        </div>
        {loadError && (
          <ErrorBanner message={loadError} onDismiss={() => setLoadError(null)} />
        )}
        <div className="dash-welcome">
          <div className="dash-welcome-heading">Acadence</div>
          <p className="dash-welcome-body">
            A focused workspace for managing your university assignments across every unit.
            Track deadlines, monitor progress, and stay on top of what matters.
          </p>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 5,
                letterSpacing: '0.05em'
              }}
            >
              Theme
            </label>
            <select
              className="filter-select"
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as ThemeId)}
              aria-label="Theme"
            >
              <option value="editorial-control-room">Editorial Control Room</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 5,
                letterSpacing: '0.05em'
              }}
            >
              Display density
            </label>
            <select
              className="filter-select"
              value={density}
              onChange={(e) => onDensityChange(e.target.value as Density)}
              aria-label="Display density"
            >
              <option value="compact">Compact</option>
              <option value="balanced">Balanced</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={handleCreate}>
              Create your first assignment
            </button>
            <button className="btn btn-secondary" onClick={handleSkip}>
              Skip for now
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Normal dashboard (empty or populated)
  return (
    <div>
      <div className="page-header" style={{ marginBottom: 20 }}>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Your academic workspace at a glance</p>
      </div>

      {loadError && (
        <ErrorBanner message={loadError} onDismiss={() => setLoadError(null)} />
      )}

      <div className="dash-grid">
        <DashboardWidget title="Due soon" count={dueSoon.length} accent="amber">
          {dueSoon.length === 0 ? (
            <EmptyWidgetState message="Nothing due in the next 3 days." />
          ) : (
            dueSoon.map((a) => (
              <DashAssignmentRow
                key={a.id}
                assignment={a}
                label={<DueSoonLabel dateStr={a.dueDate} />}
              />
            ))
          )}
        </DashboardWidget>

        <DashboardWidget title="Overdue" count={overdue.length} accent="red">
          {overdue.length === 0 ? (
            <EmptyWidgetState message="No overdue assignments." />
          ) : (
            overdue.map((a) => (
              <DashAssignmentRow
                key={a.id}
                assignment={a}
                label={<span className="due-label due-overdue">Overdue</span>}
              />
            ))
          )}
        </DashboardWidget>

        <DashboardWidget title="Upcoming this week" count={thisWeek.length} accent="blue">
          {thisWeek.length === 0 ? (
            <EmptyWidgetState message="Nothing else due this week." />
          ) : (
            thisWeek.map((a) => (
              <DashAssignmentRow
                key={a.id}
                assignment={a}
                label={<DueSoonLabel dateStr={a.dueDate} />}
              />
            ))
          )}
        </DashboardWidget>

        <DashboardWidget title="Completion" count={completed.length} accent="green">
          {hasAny ? (
            <>
              <ProgressBar value={completed.length} max={total} />
              <p className="dash-completion-detail">
                {total - completed.length} assignment{total - completed.length !== 1 ? 's' : ''} remaining
              </p>
            </>
          ) : (
            <EmptyWidgetState message="No assignments tracked yet." />
          )}
        </DashboardWidget>

      </div>
    </div>
  )
}
