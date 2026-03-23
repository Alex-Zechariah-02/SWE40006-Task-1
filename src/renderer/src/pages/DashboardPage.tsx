import { useState } from 'react'
import ThemeIcon from '../components/ThemeIcon'
import { useResponsiveLayout } from '../hooks/useResponsiveLayout'
import { useAssignments } from '../context/assignments/AssignmentContext'
import ErrorBanner from '../components/ErrorBanner'
import type { ThemeId } from '../services/theme'
import { formatTimestamp, daysUntilDue } from '../services/date'
import { deriveDashboard } from '../features/dashboard/selectors/dashboardSelectors'
import {
  isOnboarded,
  markOnboarded,
} from '../features/dashboard/storage/onboarding'
import DashboardWidget from '../features/dashboard/ui/DashboardWidget'
import DashboardAssignmentRow from '../features/dashboard/ui/DashboardAssignmentRow'
import ProgressBar from '../features/dashboard/ui/ProgressBar'
import DashboardOnboarding from '../features/dashboard/ui/DashboardOnboarding'
import DashboardEmptyState from '../features/dashboard/ui/DashboardEmptyState'

function DueSoonLabel({ dateStr }: { dateStr: string }) {
  const days = daysUntilDue(dateStr)
  if (days === null) return null
  if (days === 0) return <span className="due-label due-today">Today</span>
  if (days === 1) return <span className="due-label due-soon">Tomorrow</span>
  return <span className="due-label due-soon">In {days} days</span>
}

function EmptyWidgetState({ message }: { message: string }) {
  return <p className="dash-widget-empty">{message}</p>
}

interface DashboardPageProps {
  onNavigate: () => void
  theme: ThemeId
  onThemeChange: (theme: ThemeId) => void
  iconFamily: 'phosphor' | 'tabler'
}

export default function DashboardPage({
  onNavigate,
  theme,
  onThemeChange,
  iconFamily,
}: DashboardPageProps) {
  const { assignments, loadError: contextLoadError } = useAssignments()
  const [loadError, setLoadError] = useState<string | null>(contextLoadError)
  const [onboarded, setOnboarded] = useState(isOnboarded)
  const { ref: gridRef, columns } = useResponsiveLayout()

  const {
    overdue,
    dueSoon,
    thisWeek,
    completed,
    total,
    sortedUnits,
    recentActivity,
    readiness,
  } = deriveDashboard(assignments)
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

  if (!hasAny && !onboarded) {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: 20 }}>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Your academic workspace at a glance</p>
        </div>
        {loadError && (
          <ErrorBanner
            message={loadError}
            onDismiss={() => setLoadError(null)}
          />
        )}
        <DashboardOnboarding
          theme={theme}
          onThemeChange={onThemeChange}
          onCreate={handleCreate}
          onSkip={handleSkip}
        />
      </div>
    )
  }

  if (onboarded && !hasAny) {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: 20 }}>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Your academic workspace at a glance</p>
        </div>
        {loadError && (
          <ErrorBanner
            message={loadError}
            onDismiss={() => setLoadError(null)}
          />
        )}
        <DashboardEmptyState onCreate={onNavigate} />
      </div>
    )
  }

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 20 }}>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Your academic workspace at a glance</p>
      </div>

      {loadError && (
        <ErrorBanner message={loadError} onDismiss={() => setLoadError(null)} />
      )}

      <div
        className="dash-grid"
        ref={gridRef}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        <DashboardWidget
          title="Due soon"
          count={dueSoon.length}
          accent="amber"
          icon={
            <ThemeIcon
              name="clock"
              family={iconFamily}
              size={13}
              weight="light"
            />
          }
          index={0}
        >
          {dueSoon.length === 0 ? (
            <EmptyWidgetState message="Nothing due in the next 3 days." />
          ) : (
            dueSoon.map((a) => (
              <DashboardAssignmentRow
                key={a.id}
                assignment={a}
                label={<DueSoonLabel dateStr={a.dueDate} />}
              />
            ))
          )}
        </DashboardWidget>

        <DashboardWidget
          title="Overdue"
          count={overdue.length}
          accent="red"
          icon={
            <ThemeIcon
              name="warning"
              family={iconFamily}
              size={13}
              weight="light"
            />
          }
          index={1}
        >
          {overdue.length === 0 ? (
            <EmptyWidgetState message="No overdue assignments." />
          ) : (
            overdue.map((a) => (
              <DashboardAssignmentRow
                key={a.id}
                assignment={a}
                label={<span className="due-label due-overdue">Overdue</span>}
              />
            ))
          )}
        </DashboardWidget>

        <DashboardWidget
          title="Upcoming this week"
          count={thisWeek.length}
          accent="blue"
          icon={
            <ThemeIcon
              name="calendar"
              family={iconFamily}
              size={13}
              weight="light"
            />
          }
          index={2}
        >
          {thisWeek.length === 0 ? (
            <EmptyWidgetState message="Nothing else due this week." />
          ) : (
            thisWeek.map((a) => (
              <DashboardAssignmentRow
                key={a.id}
                assignment={a}
                label={<DueSoonLabel dateStr={a.dueDate} />}
              />
            ))
          )}
        </DashboardWidget>

        <DashboardWidget
          title="By unit"
          count={sortedUnits.length}
          accent="neutral"
          icon={
            <ThemeIcon
              name="bookmarks"
              family={iconFamily}
              size={13}
              weight="light"
            />
          }
          index={3}
        >
          {sortedUnits.length === 0 ? (
            <EmptyWidgetState message="No assignments tracked yet." />
          ) : (
            <ul className="dash-unit-list">
              {sortedUnits.map(([unit, count]) => (
                <li key={unit} className="dash-unit-row">
                  <span className="dash-unit-name">{unit}</span>
                  <span className="dash-unit-count">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </DashboardWidget>

        <DashboardWidget
          title="Completion"
          count={completed.length}
          accent="green"
          icon={
            <ThemeIcon
              name="check-circle"
              family={iconFamily}
              size={13}
              weight="light"
            />
          }
          index={4}
        >
          {hasAny ? (
            <>
              <ProgressBar value={completed.length} max={total} />
              <p className="dash-completion-detail">
                {total - completed.length} assignment
                {total - completed.length !== 1 ? 's' : ''} remaining
              </p>
            </>
          ) : (
            <EmptyWidgetState message="No assignments tracked yet." />
          )}
        </DashboardWidget>

        <DashboardWidget
          title="Recent activity"
          count={recentActivity.length}
          accent="neutral"
          icon={
            <ThemeIcon
              name="clock-history"
              family={iconFamily}
              size={13}
              weight="light"
            />
          }
          index={5}
        >
          {recentActivity.length === 0 ? (
            <EmptyWidgetState message="No activity recorded yet." />
          ) : (
            <ul className="dash-activity-list">
              {recentActivity.map(({ assignment, entry }) => (
                <li key={entry.id} className="dash-activity-row">
                  <div className="dash-activity-action">{entry.action}</div>
                  <div className="dash-activity-meta">
                    <span className="dash-activity-assignment">
                      {assignment.title}
                    </span>
                    <span className="dash-activity-time">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DashboardWidget>

        <DashboardWidget
          title="Readiness score"
          count={readiness}
          accent={readiness >= 70 ? 'green' : readiness >= 40 ? 'amber' : 'red'}
          icon={
            <ThemeIcon
              name="target"
              family={iconFamily}
              size={13}
              weight="light"
            />
          }
          index={6}
        >
          <div className="dash-readiness">
            <div className="dash-progress-wrap">
              <div className="dash-progress-bar">
                <div
                  className="dash-progress-fill"
                  style={{ width: `${readiness}%` }}
                />
              </div>
            </div>
            <p className="dash-readiness-label">
              {readiness >= 80
                ? 'On track'
                : readiness >= 50
                  ? 'Needs attention'
                  : 'At risk'}
            </p>
          </div>
        </DashboardWidget>
      </div>
    </div>
  )
}
