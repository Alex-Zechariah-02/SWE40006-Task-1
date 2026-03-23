import { motion } from 'motion/react'

interface DashboardWidgetProps {
  title: string
  count: number
  accent: 'red' | 'amber' | 'blue' | 'green' | 'neutral'
  icon?: React.ReactNode
  children: React.ReactNode
  index?: number
}

export default function DashboardWidget({
  title,
  count,
  accent,
  icon,
  children,
  index = 0,
}: DashboardWidgetProps) {
  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const yOffset = motionEnabled ? (reduced ? 6 : 12) : 0
  const dur = motionEnabled ? (reduced ? 0.1 : 0.2) : 0

  return (
    <motion.section
      className={`dash-widget dash-widget--${accent}`}
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: dur,
        delay: index * (reduced ? 0.03 : 0.06),
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      <header className="dash-widget-header">
        <span className="dash-widget-title">
          {icon && (
            <span className="dash-widget-icon" aria-hidden="true">
              {icon}
            </span>
          )}
          {title}
        </span>
        <span className="dash-widget-count">{count}</span>
      </header>
      <div className="dash-widget-body">{children}</div>
    </motion.section>
  )
}
