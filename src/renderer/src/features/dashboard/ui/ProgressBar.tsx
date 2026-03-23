interface ProgressBarProps {
  value: number
  max: number
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
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
