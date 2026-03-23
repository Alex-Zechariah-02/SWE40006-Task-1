import CustomSelect from '../../../shared/ui/controls/CustomSelect'
import ThemePreviewGrid from './ThemePreviewGrid'
import type {
  ThemeId,
  ColorMode,
  OverlayBlur,
  FontSize,
  ColorPresence,
  NotificationPosition,
} from '../../../services/theme'
import type { MotionPreference } from '../config/settingsOptions'
import {
  COLOR_MODE_OPTIONS,
  MOTION_OPTIONS,
  BLUR_OPTIONS,
  FONT_SIZE_OPTIONS,
  COLOR_PRESENCE_OPTIONS,
  NOTIFICATION_POSITION_OPTIONS,
} from '../config/settingsOptions'

interface AppearanceSettingsSectionProps {
  theme: ThemeId
  onThemeChange: (theme: ThemeId) => void
  colorMode: ColorMode
  onColorModeChange: (mode: ColorMode) => void
  motionPreference: MotionPreference
  onMotionPreferenceChange: (pref: MotionPreference) => void
  overlayBlur: OverlayBlur
  onOverlayBlurChange: (blur: OverlayBlur) => void
  fontSize: FontSize
  onFontSizeChange: (size: FontSize) => void
  colorPresence: ColorPresence
  onColorPresenceChange: (presence: ColorPresence) => void
  notificationPosition: NotificationPosition
  onNotificationPositionChange: (position: NotificationPosition) => void
}

export default function AppearanceSettingsSection({
  theme,
  onThemeChange,
  colorMode,
  onColorModeChange,
  motionPreference,
  onMotionPreferenceChange,
  overlayBlur,
  onOverlayBlurChange,
  fontSize,
  onFontSizeChange,
  colorPresence,
  onColorPresenceChange,
  notificationPosition,
  onNotificationPositionChange,
}: AppearanceSettingsSectionProps) {
  return (
    <div className="settings-section">
      <div className="settings-section-title">Theme</div>
      <div
        className="settings-row"
        style={{
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 8,
        }}
      >
        <div>
          <div className="settings-row-label">Visual identity</div>
          <div className="settings-row-desc">
            Choose a theme for your workspace
          </div>
        </div>
        <ThemePreviewGrid currentTheme={theme} onSelect={onThemeChange} />
      </div>

      <div className="settings-section-title" style={{ marginTop: 0 }}>
        Display
      </div>
      <div className="settings-row">
        <div>
          <div className="settings-row-label">Font size</div>
          <div className="settings-row-desc">
            Controls the text size throughout the app
          </div>
        </div>
        <div className="settings-row-control">
          <CustomSelect
            value={fontSize}
            onChange={(v) => onFontSizeChange(v as FontSize)}
            options={FONT_SIZE_OPTIONS}
            aria-label="Font size"
          />
        </div>
      </div>
      <div className="settings-row">
        <div>
          <div className="settings-row-label">Color mode</div>
          <div className="settings-row-desc">
            Switch between light and dark appearance
          </div>
        </div>
        <div className="settings-row-control">
          <CustomSelect
            value={colorMode}
            onChange={(v) => onColorModeChange(v as ColorMode)}
            options={COLOR_MODE_OPTIONS}
            aria-label="Color mode"
          />
        </div>
      </div>
      <div className="settings-row">
        <div>
          <div className="settings-row-label">Color presence</div>
          <div className="settings-row-desc">
            Controls how much accent color the interface uses
          </div>
        </div>
        <div className="settings-row-control">
          <CustomSelect
            value={colorPresence}
            onChange={(v) => onColorPresenceChange(v as ColorPresence)}
            options={COLOR_PRESENCE_OPTIONS}
            aria-label="Color presence"
          />
        </div>
      </div>
      <div className="settings-row">
        <div>
          <div className="settings-row-label">Motion</div>
          <div className="settings-row-desc">
            Controls transitions and animations throughout the app
          </div>
        </div>
        <div className="settings-row-control">
          <CustomSelect
            value={motionPreference}
            onChange={(v) => onMotionPreferenceChange(v as MotionPreference)}
            options={MOTION_OPTIONS}
            aria-label="Motion preference"
          />
        </div>
      </div>
      <div className="settings-row">
        <div>
          <div className="settings-row-label">Overlay blur</div>
          <div className="settings-row-desc">
            Backdrop blur when the detail overlay drawer is open
          </div>
        </div>
        <div className="settings-row-control">
          <CustomSelect
            value={overlayBlur}
            onChange={(v) => onOverlayBlurChange(v as OverlayBlur)}
            options={BLUR_OPTIONS}
            aria-label="Overlay blur"
          />
        </div>
      </div>
      <div className="settings-row">
        <div>
          <div className="settings-row-label">Notification position</div>
          <div className="settings-row-desc">
            Where toast notifications appear on screen
          </div>
        </div>
        <div className="settings-row-control">
          <CustomSelect
            value={notificationPosition}
            onChange={(v) =>
              onNotificationPositionChange(v as NotificationPosition)
            }
            options={NOTIFICATION_POSITION_OPTIONS}
            aria-label="Notification position"
          />
        </div>
      </div>
    </div>
  )
}
