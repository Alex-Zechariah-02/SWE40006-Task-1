import {
  HouseLine,
  ClipboardText,
  GearSix,
  CaretLeft,
  CaretRight,
  CaretDown,
  CaretRight as CaretRightIcon,
  Clock,
  WarningOctagon,
  CalendarBlank,
  Bookmarks,
  CheckCircle,
  ClockClockwise,
  Target,
  PencilSimple,
  Trash,
  CircleDashed,
  Spinner,
  MagnifyingGlass,
  HourglassHigh,
  ArrowLeft,
  Info,
  Flag,
  ListChecks,
  Note,
  ClockCounterClockwise,
  ArrowsOutSimple,
  ArrowsInSimple,
  Sliders,
  PaintBrush,
  ArrowsClockwise,
  Tag,
  Palette,
  Timer,
  X,
} from '@phosphor-icons/react'

import {
  IconHome,
  IconClipboardText,
  IconSettings,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconChevronRight as IconChevronRightAlt,
  IconClock,
  IconAlertOctagon,
  IconCalendar,
  IconBookmarks,
  IconCircleCheck,
  IconHistory,
  IconTarget,
  IconPencil,
  IconTrash,
  IconCircleDashed,
  IconLoader2,
  IconSearch,
  IconHourglass,
  IconArrowLeft,
  IconInfoCircle,
  IconFlag,
  IconListCheck,
  IconNote,
  IconClockHour3,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconAdjustments,
  IconBrush,
  IconRefresh,
  IconTag,
  IconPalette,
  IconAlarm,
  IconX,
} from '@tabler/icons-react'

type IconFamily = 'phosphor' | 'tabler'

export type IconName =
  | 'home'
  | 'clipboard'
  | 'gear'
  | 'caret-left'
  | 'caret-right'
  | 'caret-down'
  | 'caret-right-sm'
  | 'clock'
  | 'warning'
  | 'calendar'
  | 'bookmarks'
  | 'check-circle'
  | 'clock-history'
  | 'target'
  | 'edit'
  | 'trash'
  | 'circle-dashed'
  | 'spinner'
  | 'search'
  | 'hourglass'
  | 'arrow-left'
  | 'info'
  | 'flag'
  | 'list-checks'
  | 'note'
  | 'history'
  | 'expand'
  | 'collapse'
  | 'sliders'
  | 'paint-brush'
  | 'refresh'
  | 'tag'
  | 'palette'
  | 'timer'
  | 'close'

interface ThemeIconProps {
  name: IconName
  family: IconFamily
  size?: number
  weight?: 'light' | 'regular' | 'bold' | 'fill'
  className?: string
  style?: React.CSSProperties
}

const PHOSPHOR_MAP: Record<IconName, React.ComponentType<any>> = {
  home: HouseLine,
  clipboard: ClipboardText,
  gear: GearSix,
  'caret-left': CaretLeft,
  'caret-right': CaretRight,
  'caret-down': CaretDown,
  'caret-right-sm': CaretRightIcon,
  clock: Clock,
  warning: WarningOctagon,
  calendar: CalendarBlank,
  bookmarks: Bookmarks,
  'check-circle': CheckCircle,
  'clock-history': ClockClockwise,
  target: Target,
  edit: PencilSimple,
  trash: Trash,
  'circle-dashed': CircleDashed,
  spinner: Spinner,
  search: MagnifyingGlass,
  hourglass: HourglassHigh,
  'arrow-left': ArrowLeft,
  info: Info,
  flag: Flag,
  'list-checks': ListChecks,
  note: Note,
  history: ClockCounterClockwise,
  expand: ArrowsOutSimple,
  collapse: ArrowsInSimple,
  sliders: Sliders,
  'paint-brush': PaintBrush,
  refresh: ArrowsClockwise,
  tag: Tag,
  palette: Palette,
  timer: Timer,
  close: X,
}

const TABLER_MAP: Record<IconName, React.ComponentType<any>> = {
  home: IconHome,
  clipboard: IconClipboardText,
  gear: IconSettings,
  'caret-left': IconChevronLeft,
  'caret-right': IconChevronRight,
  'caret-down': IconChevronDown,
  'caret-right-sm': IconChevronRightAlt,
  clock: IconClock,
  warning: IconAlertOctagon,
  calendar: IconCalendar,
  bookmarks: IconBookmarks,
  'check-circle': IconCircleCheck,
  'clock-history': IconHistory,
  target: IconTarget,
  edit: IconPencil,
  trash: IconTrash,
  'circle-dashed': IconCircleDashed,
  spinner: IconLoader2,
  search: IconSearch,
  hourglass: IconHourglass,
  'arrow-left': IconArrowLeft,
  info: IconInfoCircle,
  flag: IconFlag,
  'list-checks': IconListCheck,
  note: IconNote,
  history: IconClockHour3,
  expand: IconArrowsMaximize,
  collapse: IconArrowsMinimize,
  sliders: IconAdjustments,
  'paint-brush': IconBrush,
  refresh: IconRefresh,
  tag: IconTag,
  palette: IconPalette,
  timer: IconAlarm,
  close: IconX,
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

  const Icon = PHOSPHOR_MAP[name]
  if (!Icon) return null
  return (
    <Icon size={size} weight={weight} className={className} style={style} />
  )
}
