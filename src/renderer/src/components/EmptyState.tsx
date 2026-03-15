interface EmptyStateProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export default function EmptyState({ title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="empty-state-title">{title}</p>
      {subtitle && <p className="empty-state-subtitle">{subtitle}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  )
}
