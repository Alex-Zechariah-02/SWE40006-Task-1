import type {
  ColorMode,
  OverlayBlur,
  FontSize,
  ColorPresence,
  NotificationPosition,
} from '../../../services/theme'

export type MotionPreference = 'default' | 'reduced' | 'none'

export const COLOR_MODE_OPTIONS: Array<{ value: ColorMode; label: string }> = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

export const MOTION_OPTIONS: Array<{
  value: MotionPreference
  label: string
}> = [
  { value: 'default', label: 'Default' },
  { value: 'reduced', label: 'Reduced' },
  { value: 'none', label: 'None' },
]

export const BLUR_OPTIONS: Array<{ value: OverlayBlur; label: string }> = [
  { value: 'none', label: 'None' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'medium', label: 'Medium' },
]

export const FONT_SIZE_OPTIONS: Array<{ value: FontSize; label: string }> = [
  { value: 'tiny', label: 'Tiny' },
  { value: 'small', label: 'Small' },
  { value: 'default', label: 'Default' },
  { value: 'big', label: 'Big' },
  { value: 'huge', label: 'Huge' },
]

export const COLOR_PRESENCE_OPTIONS: Array<{
  value: ColorPresence
  label: string
}> = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'balanced', label: 'Balanced' },
]

export const NOTIFICATION_POSITION_OPTIONS: Array<{
  value: NotificationPosition
  label: string
}> = [
  { value: 'top-right', label: 'Top right' },
  { value: 'bottom-right', label: 'Bottom right' },
  { value: 'top-center', label: 'Top center' },
  { value: 'bottom-center', label: 'Bottom center' },
]
