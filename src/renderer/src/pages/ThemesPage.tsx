interface ThemeFont {
  display: string
  heading: string
  body: string
  mono: string
}

interface ThemeCardProps {
  name: string
  feel: string
  fonts: ThemeFont
  release: string
  available: boolean
}

function ThemeCard({ name, feel, fonts, release, available }: ThemeCardProps) {
  return (
    <div className={`theme-card${available ? '' : ' theme-card--upcoming'}`}>
      <div className="theme-card-header">
        <span className="theme-card-name">{name}</span>
        <span className={`theme-card-badge${available ? '' : ' theme-card-badge--upcoming'}`}>
          {release}
        </span>
      </div>
      <p className="theme-card-feel">{feel}</p>
      <div className="theme-card-fonts">
        <span className="theme-font-row">
          <span className="theme-font-role">Display</span>
          <span className="theme-font-name">{fonts.display}</span>
        </span>
        <span className="theme-font-row">
          <span className="theme-font-role">Heading</span>
          <span className="theme-font-name">{fonts.heading}</span>
        </span>
        <span className="theme-font-row">
          <span className="theme-font-role">Body</span>
          <span className="theme-font-name">{fonts.body}</span>
        </span>
        <span className="theme-font-row">
          <span className="theme-font-role">Mono</span>
          <span className="theme-font-name">{fonts.mono}</span>
        </span>
      </div>
    </div>
  )
}

const THEMES: ThemeCardProps[] = [
  {
    name: 'Editorial Control Room',
    feel: 'Sharp, intelligent, academic, and editorial. A high-quality planning desk.',
    fonts: {
      display: 'Newsreader',
      heading: 'Bricolage Grotesque',
      body: 'IBM Plex Sans',
      mono: 'Azeret Mono'
    },
    release: 'Available now',
    available: true
  },
  {
    name: 'Precision Systems Console',
    feel: 'Disciplined, technical, structured, and efficient.',
    fonts: {
      display: 'Source Serif 4',
      heading: 'IBM Plex Sans Condensed',
      body: 'IBM Plex Sans',
      mono: 'IBM Plex Mono'
    },
    release: 'Coming soon',
    available: false
  },
  {
    name: 'Readable Atelier',
    feel: 'Warm, calm, humane, and highly legible.',
    fonts: {
      display: 'Newsreader',
      heading: 'Instrument Sans',
      body: 'Atkinson Hyperlegible Next',
      mono: 'Recursive'
    },
    release: 'Ships in v1.1.0',
    available: false
  },
  {
    name: 'Experimental Utility',
    feel: 'Most design-forward and memorable, still controlled for academic use.',
    fonts: {
      display: 'Fraunces',
      heading: 'Plus Jakarta Sans',
      body: 'Hind',
      mono: 'Recursive'
    },
    release: 'Ships in v1.1.0',
    available: false
  }
]

export default function ThemesPage() {
  return (
    <div>
      <div className="page-header" style={{ marginBottom: 20 }}>
        <h1 className="page-title">Themes</h1>
        <p className="page-subtitle">Choose a visual identity for your workspace</p>
      </div>
      <p className="themes-note">
        Theme switching is available in Settings &gt; Appearance. The themes below define the visual
        identity roadmap for Acadence.
      </p>
      <div className="theme-grid">
        {THEMES.map((t) => (
          <ThemeCard key={t.name} {...t} />
        ))}
      </div>
    </div>
  )
}
