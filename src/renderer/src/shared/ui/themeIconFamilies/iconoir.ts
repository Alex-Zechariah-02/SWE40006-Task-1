import type React from 'react'
import {
  Alarm,
  ArrowLeft,
  Archery,
  Bookmark,
  Calendar,
  CheckCircle,
  Circle,
  Collapse,
  ColorPicker,
  ControlSlider,
  Clock,
  ClockRotateRight,
  Edit,
  Expand,
  Home,
  Hourglass,
  InfoCircle,
  Label,
  NavArrowDown,
  NavArrowLeft,
  NavArrowRight,
  Page,
  Palette,
  PasteClipboard,
  Refresh,
  RefreshCircle,
  Search,
  Settings,
  TaskList,
  Trash,
  TriangleFlag,
  WarningHexagon,
  Xmark,
} from 'iconoir-react'

import type { IconName } from '../../../types/themeIcon'

export type IconoirIconComponent = React.ComponentType<{
  width?: number | string
  height?: number | string
  strokeWidth?: number | string
  className?: string
  style?: React.CSSProperties
}>

export const ICONOIR_MAP: Record<IconName, IconoirIconComponent> = {
  home: Home,
  clipboard: PasteClipboard,
  gear: Settings,
  'caret-left': NavArrowLeft,
  'caret-right': NavArrowRight,
  'caret-down': NavArrowDown,
  'caret-right-sm': NavArrowRight,
  clock: Clock,
  warning: WarningHexagon,
  calendar: Calendar,
  bookmarks: Bookmark,
  'check-circle': CheckCircle,
  'clock-history': ClockRotateRight,
  target: Archery,
  edit: Edit,
  trash: Trash,
  'circle-dashed': Circle,
  spinner: RefreshCircle,
  search: Search,
  hourglass: Hourglass,
  'arrow-left': ArrowLeft,
  info: InfoCircle,
  flag: TriangleFlag,
  'list-checks': TaskList,
  note: Page,
  history: ClockRotateRight,
  expand: Expand,
  collapse: Collapse,
  sliders: ControlSlider,
  'paint-brush': ColorPicker,
  refresh: Refresh,
  tag: Label,
  palette: Palette,
  timer: Alarm,
  close: Xmark,
}
