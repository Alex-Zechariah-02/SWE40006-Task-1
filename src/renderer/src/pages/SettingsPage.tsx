import { useState } from 'react'
import type { ThemeId } from '../services/theme'

declare const __APP_VERSION__: string

type Density = 'compact' | 'balanced' | 'spacious'
type SettingsTab = 'general' | 'appearance' | 'updates' | 'about'

interface SettingsPageProps {
  density: Density
  onDensityChange: (density: Density) => void
  theme: ThemeId
  onThemeChange: (theme: ThemeId) => void
}

export default function SettingsPage({ density, onDensityChange, theme, onThemeChange }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance')

  const TAB_LABELS: Record<SettingsTab, string> = {
    general: 'General',
    appearance: 'Appearance',
    updates: 'Updates',
    about: 'About'
  }

  return (
    <div className="settings-page">
      <div className="page-header" style={{ marginBottom: 20 }}>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Preferences for your workspace</p>
      </div>

      <div className="settings-layout">
        <nav className="settings-tabs" aria-label="Settings sections">
          {(Object.keys(TAB_LABELS) as SettingsTab[]).map((tab) => (
            <button
              key={tab}
              className={`settings-tab-btn${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </nav>

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <div className="settings-section-title">Data</div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Storage</div>
                  <div className="settings-row-desc">Assignment data is stored locally on this device</div>
                </div>
                <div className="settings-row-control">
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Local</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <div className="settings-section-title">Appearance</div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Theme</div>
                  <div className="settings-row-desc">Visual identity for your workspace</div>
                </div>
                <div className="settings-row-control">
                  <select
                    className="filter-select"
                    value={theme}
                    onChange={(e) => onThemeChange(e.target.value as ThemeId)}
                    aria-label="Theme"
                  >
                    <option value="editorial-control-room">Editorial Control Room</option>
                  </select>
                </div>
              </div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Density</div>
                  <div className="settings-row-desc">Controls the spacing of list rows and content areas</div>
                </div>
                <div className="settings-row-control">
                  <select
                    className="filter-select"
                    value={density}
                    onChange={(e) => onDensityChange(e.target.value as Density)}
                    aria-label="Display density"
                  >
                    <option value="compact">Compact</option>
                    <option value="balanced">Balanced</option>
                    <option value="spacious">Spacious</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="settings-section">
              <div className="settings-section-title">Updates</div>
              <div className="settings-row">
                <div>
                  <div className="settings-row-label">Automatic updates</div>
                  <div className="settings-row-desc">Update checking is not available in this version.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="settings-section">
              <div className="about-field">
                <span className="about-field-label">Application</span>
                <span className="about-field-value">Acadence</span>
              </div>
              <div className="about-field">
                <span className="about-field-label">Version</span>
                <span className="about-field-value">{__APP_VERSION__}</span>
              </div>
              <div className="about-field">
                <span className="about-field-label">Description</span>
                <span className="about-field-value">
                  A desktop academic workspace for managing assignments across multiple units.
                </span>
              </div>
              <div className="about-field">
                <span className="about-field-label">Platform</span>
                <span className="about-field-value">Electron + React + TypeScript</span>
              </div>
              <div className="about-field">
                <span className="about-field-label">Storage</span>
                <span className="about-field-value">Local device storage</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
