export default function AboutSettingsSection() {
  return (
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
          A desktop academic workspace for managing assignments across multiple
          units.
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
  )
}
