import { useState } from 'react'
import ThemeIcon from '../../../shared/ui/ThemeIcon'
import { useResponsiveLayout } from '../../../shared/hooks/useResponsiveLayout'
import { useAssignments } from '../../assignments/state/AssignmentContext'
import ErrorBanner from '../../../shared/ui/ErrorBanner'
import type { ThemeId } from '../../../services/theme'
import type { IconFamily } from '../../../types/icon'
import { formatTimestamp } from '../../../services/date'
import { deriveDashboard } from '../selectors/dashboardSelectors'
import { isOnboarded, markOnboarded } from '../storage/onboarding'
import DashboardWidget from './DashboardWidget'
import DashboardAssignmentRow from './DashboardAssignmentRow'
import ProgressBar from './ProgressBar'
import DashboardOnboarding from './DashboardOnboarding'
import DashboardEmptyState from './DashboardEmptyState'
import { DueSoonLabel, EmptyWidgetState } from './DashboardWidgetHelpers'

export interface DashboardViewProps {
  onNavigate: () => void
  theme: ThemeId
  onThemeChange: (theme: ThemeId) => void
  iconFamily: IconFamily
}

export default function DashboardView({
  onNavigate,
  theme,
  onThemeChange,
  iconFamily,
}: DashboardViewProps) {
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

