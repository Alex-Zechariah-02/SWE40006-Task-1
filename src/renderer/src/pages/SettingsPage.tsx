import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type {
  ThemeId,
  ColorMode,
  OverlayBlur,
  FontSize,
  ColorPresence,
  NotificationPosition,
} from '../services/theme'
import type { IconFamily } from '../types/icon'
import { useAssignments } from '../features/assignments/state/AssignmentContext'
import { RELEASES_URL } from '../services/release'
import { toast } from '../shared/ui/ToastContainer'
import SettingsTabNav, { type SettingsTab } from '../features/settings/ui/SettingsTabNav'
import GeneralSettingsSection from '../features/settings/ui/GeneralSettingsSection'
import AppearanceSettingsSection from '../features/settings/ui/AppearanceSettingsSection'
import UpdatesSettingsSection from '../features/settings/ui/UpdatesSettingsSection'
import AboutSettingsSection from '../features/settings/ui/AboutSettingsSection'
import type { MotionPreference } from '../features/settings/config/settingsOptions'
import { useReleaseEntries } from '../features/settings/hooks/useReleaseEntries'

const LAST_OPENED_UPDATES_KEY = 'acadence-update-last-checked'

function loadLastOpenedUpdates(): string | null {
  try {
    return localStorage.getItem(LAST_OPENED_UPDATES_KEY)
  } catch {
    return null
  }
}

function saveLastOpenedUpdates(): string {
  const now = new Date().toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  try {
    localStorage.setItem(LAST_OPENED_UPDATES_KEY, now)
  } catch {
    /* ignore */
  }
  return now
}

interface SettingsPageProps {
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
  iconFamily: IconFamily
}

export default function SettingsPage({
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
  iconFamily,
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance')
  const { assignments, dispatch } = useAssignments()
  const [lastOpenedUpdates, setLastOpenedUpdates] = useState<string | null>(
    () => loadLastOpenedUpdates(),
  )
  const releaseEntries = useReleaseEntries()

  async function handleOpenReleases() {
    if (!RELEASES_URL) {
      toast.info('No releases URL is configured for this build.')
      return
    }
    const ok = await window.api.openExternal(RELEASES_URL)
    if (!ok) {
      toast.error('Unable to open the releases page.')
      return
    }

    const ts = saveLastOpenedUpdates()
    setLastOpenedUpdates(ts)
  }

  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const tabMotion = motionEnabled
    ? {
        initial: { opacity: 0, y: reduced ? 2 : 4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: reduced ? -2 : -4 },
        transition: {
          duration: reduced ? 0.08 : 0.15,
          ease: [0.25, 1, 0.5, 1] as const,
        },
      }
    : {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }

  return (
    <div className="settings-page">
      <div className="page-header" style={{ marginBottom: 20 }}>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Preferences for your workspace</p>
      </div>

      <div className="settings-layout">
        <SettingsTabNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          iconFamily={iconFamily}
        />

        <div className="settings-content">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === 'general' && (
              <motion.div key="general" {...tabMotion}>
                <GeneralSettingsSection
                  assignments={assignments}
                  onImportAssignments={(imported) =>
                    dispatch({ type: 'SET_ALL', assignments: imported })
                  }
                />
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div key="appearance" {...tabMotion}>
                <AppearanceSettingsSection
                  theme={theme}
                  onThemeChange={onThemeChange}
                  colorMode={colorMode}
                  onColorModeChange={onColorModeChange}
                  motionPreference={motionPreference}
                  onMotionPreferenceChange={onMotionPreferenceChange}
                  overlayBlur={overlayBlur}
                  onOverlayBlurChange={onOverlayBlurChange}
                  fontSize={fontSize}
                  onFontSizeChange={onFontSizeChange}
                  colorPresence={colorPresence}
                  onColorPresenceChange={onColorPresenceChange}
                  notificationPosition={notificationPosition}
                  onNotificationPositionChange={onNotificationPositionChange}
                />
              </motion.div>
            )}

            {activeTab === 'updates' && (
              <motion.div key="updates" {...tabMotion}>
                <UpdatesSettingsSection
                  lastOpenedUpdates={lastOpenedUpdates}
                  onOpenReleases={handleOpenReleases}
                  releaseEntries={releaseEntries}
                  releasesUrl={RELEASES_URL}
                  iconFamily={iconFamily}
                />
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div key="about" {...tabMotion}>
                <AboutSettingsSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
