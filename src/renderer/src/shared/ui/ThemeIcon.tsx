import type { IconFamily } from '../../types/icon'
import type { IconName } from '../../types/themeIcon'
import { PHOSPHOR_MAP } from './themeIconFamilies/phosphor'
import { TABLER_MAP } from './themeIconFamilies/tabler'
import { ICONOIR_MAP } from './themeIconFamilies/iconoir'
import { REMIX_MAP } from './themeIconFamilies/remix'

interface ThemeIconProps {
  name: IconName
  family: IconFamily
  size?: number
  weight?: 'light' | 'regular' | 'bold' | 'fill'
  className?: string
  style?: React.CSSProperties
}


export default function ThemeIcon({
  name,
  family,
  size = 16,
  weight = 'light',
  className,
  style,
}: ThemeIconProps) {
  if (family === 'tabler') {
    const Icon = TABLER_MAP[name]
    if (!Icon) return null
    return <Icon size={size} stroke={1.5} className={className} style={style} />
  }

  if (family === 'iconoir') {
    const IconoirIcon = ICONOIR_MAP[name]
    if (IconoirIcon) {
      return (
        <IconoirIcon
          width={size}
          height={size}
          strokeWidth={1.5}
          className={className}
          style={style}
        />
      )
    }

    const TablerFallback = TABLER_MAP[name]
    if (!TablerFallback) return null
    return (
      <TablerFallback
        size={size}
        stroke={1.5}
        className={className}
        style={style}
      />
    )
  }

  if (family === 'remix') {
    const RemixIcon = REMIX_MAP[name]
    if (RemixIcon) {
      return <RemixIcon size={size} className={className} style={style} />
    }

    const TablerFallback = TABLER_MAP[name]
    if (!TablerFallback) return null
    return (
      <TablerFallback
        size={size}
        stroke={1.5}
        className={className}
        style={style}
      />
    )
  }

  const Icon = PHOSPHOR_MAP[name]
  if (!Icon) return null
  return (
    <Icon size={size} weight={weight} className={className} style={style} />
  )
}
