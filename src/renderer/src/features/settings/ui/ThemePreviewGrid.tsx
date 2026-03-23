import { motion } from 'motion/react'
import ThemeIcon from '../../../shared/ui/ThemeIcon'
import type { ThemeId } from '../../../services/theme'
import { THEMES, type ThemePreviewData } from '../config/themePreviewData'
import type { IconFamily } from '../../../types/icon'

interface ThemePreviewGridProps {
  currentTheme?: ThemeId
  onSelect?: (theme: ThemeId) => void
}

function ThemeCard({
  data,
  isActive,
  onSelect,
  index,
}: {
  data: ThemePreviewData
  isActive: boolean
  onSelect?: (theme: ThemeId) => void
  index: number
}) {
  const {
    name,
    feel,
    fonts,
    iconFamily,
    colors,
    motionStyle,
    release,
    available,
    id,
  } = data
  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const staggerDuration = motionEnabled ? (reduced ? 0.07 : 0.14) : 0
  const staggerDelay = motionEnabled
    ? reduced
      ? index * 0.025
      : index * 0.05
    : 0

  function handleClick() {
    if (available && onSelect) {
      onSelect(id as ThemeId)
    }
  }

  return (
    <motion.div
      className={`theme-card${available ? '' : ' theme-card--upcoming'}${isActive ? ' theme-card--active' : ''}`}
      onClick={handleClick}
      style={available && onSelect ? { cursor: 'pointer' } : undefined}
      role={available && onSelect ? 'button' : undefined}
      tabIndex={available && onSelect ? 0 : undefined}
      onKeyDown={
        available && onSelect
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') handleClick()
            }
          : undefined
      }
      whileTap={
        available && onSelect && motionEnabled ? { scale: 0.98 } : undefined
      }
      layout={motionEnabled}
      initial={{ opacity: motionEnabled ? 0 : 1, y: motionEnabled ? 8 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: staggerDuration, delay: staggerDelay }}
    >
      <div className="theme-card-header">
        <span className="theme-card-name">{name}</span>
        <span
          className={`theme-card-badge${available ? '' : ' theme-card-badge--upcoming'}${isActive ? ' theme-card-badge--active' : ''}`}
        >
          {isActive ? 'Active' : release}
        </span>
      </div>
      <p className="theme-card-feel">{feel}</p>

      <div className="theme-card-fonts">
        <span className="theme-font-row">
          <span className="theme-font-role">Display</span>
          <span
            className="theme-font-name"
            style={{ fontFamily: `'${fonts.display}', serif` }}
          >
            {fonts.display}
          </span>
        </span>
        <span className="theme-font-row">
          <span className="theme-font-role">Heading</span>
          <span
            className="theme-font-name"
            style={{ fontFamily: `'${fonts.heading}', sans-serif` }}
          >
            {fonts.heading}
          </span>
        </span>
        <span className="theme-font-row">
          <span className="theme-font-role">Body</span>
          <span
            className="theme-font-name"
            style={{ fontFamily: `'${fonts.body}', sans-serif` }}
          >
            {fonts.body}
          </span>
        </span>
        <span className="theme-font-row">
          <span className="theme-font-role">Mono</span>
          <span
            className="theme-font-name"
            style={{ fontFamily: `'${fonts.mono}', monospace` }}
          >
            {fonts.mono}
          </span>
        </span>
      </div>

      <div className="theme-card-preview-row">
        <div className="theme-card-preview-group">
          <span className="theme-card-preview-label">Icons</span>
          <span className="theme-card-preview-icons">
            {available ? (
              (() => {
                const previewFamily: IconFamily =
                  iconFamily === 'Tabler'
                    ? 'tabler'
                    : iconFamily === 'Iconoir'
                      ? 'iconoir'
                      : iconFamily === 'Remix Icon'
                        ? 'remix'
                        : 'phosphor'
                return (
                  <>
                    <ThemeIcon name="home" family={previewFamily} size={14} />
                    <ThemeIcon
                      name="clipboard"
                      family={previewFamily}
                      size={14}
                    />
                    <ThemeIcon
                      name="palette"
                      family={previewFamily}
                      size={14}
                    />
                    <ThemeIcon name="gear" family={previewFamily} size={14} />
                  </>
                )
              })()
            ) : (
              <span className="theme-card-icon-family">{iconFamily}</span>
            )}
          </span>
        </div>

        <div className="theme-card-preview-group">
          <span className="theme-card-preview-label">Colors</span>
          <span className="theme-card-preview-swatches">
            {colors.map((c, i) => (
              <span
                key={i}
                className="theme-card-swatch"
                style={{ background: c }}
              />
            ))}
          </span>
        </div>
      </div>

      <div className="theme-card-motion">
        <span className="theme-card-preview-label">Motion</span>
        <span className="theme-card-motion-desc">{motionStyle}</span>
      </div>
    </motion.div>
  )
}

export default function ThemePreviewGrid({
  currentTheme,
  onSelect,
}: ThemePreviewGridProps) {
  return (
    <div className="theme-grid">
      {THEMES.map((t, i) => (
        <ThemeCard
          key={`${t.name}-${i}`}
          data={t}
          isActive={currentTheme === t.id && t.available}
          onSelect={onSelect}
          index={i}
        />
      ))}
    </div>
  )
}
