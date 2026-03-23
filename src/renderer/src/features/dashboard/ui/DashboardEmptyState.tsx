interface DashboardEmptyStateProps {
  onCreate: () => void
}

export default function DashboardEmptyState({
  onCreate,
}: DashboardEmptyStateProps) {
  return (
    <div className="dash-empty-state">
      <p className="dash-empty-title">No assignments yet</p>
      <p className="dash-empty-desc">
        Your dashboard will populate with due dates, progress, and readiness
        once you create assignments.
      </p>
      <button className="btn btn-primary" onClick={onCreate}>
        Create your first assignment
      </button>
    </div>
  )
}
