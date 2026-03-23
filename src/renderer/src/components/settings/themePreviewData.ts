import type { ThemeId } from '../../services/theme'

interface ThemeFont {
  display: string
  heading: string
  body: string
  mono: string
}

export interface ThemePreviewData {
  id: ThemeId | string
  name: string
  feel: string
  fonts: ThemeFont
  iconFamily: string
  colors: string[]
  motionStyle: string
  release: string
  available: boolean
}

export const THEMES: ThemePreviewData[] = [
  {
    id: 'ledgerline',
    name: 'Ledgerline',
    feel: 'Sharp, intelligent, academic, and editorial. A high-quality planning desk.',
    fonts: {
      display: 'Newsreader',
      heading: 'Bricolage Grotesque',
      body: 'IBM Plex Sans',
      mono: 'Azeret Mono',
    },
    iconFamily: 'Phosphor',
    colors: ['#111111', '#2563eb', '#f4f4f5', '#059669', '#d97706', '#dc2626'],
    motionStyle:
      'Subtle transitions, 100ms standard timing, no decorative animation',
    release: 'Available now',
    available: true,
  },
  {
    id: 'vector-slate',
    name: 'Vector Slate',
    feel: 'Disciplined, technical, structured, and efficient.',
    fonts: {
      display: 'Source Serif 4',
      heading: 'IBM Plex Sans Condensed',
      body: 'IBM Plex Sans',
      mono: 'IBM Plex Mono',
    },
    iconFamily: 'Tabler',
    colors: ['#0f172a', '#1e40af', '#f1f5f9', '#047857', '#b45309', '#b91c1c'],
    motionStyle: 'Minimal, functional transitions only',
    release: 'Available now',
    available: true,
  },
  {
    id: 'quiet-measure',
    name: 'Quiet Measure',
    feel: 'Warm, calm, humane, and highly legible.',
    fonts: {
      display: 'Newsreader',
      heading: 'Instrument Sans',
      body: 'Atkinson Hyperlegible Next',
      mono: 'Recursive',
    },
    iconFamily: 'Iconoir',
    colors: ['#1a1a2e', '#6366f1', '#fafaf9', '#059669', '#eab308', '#e11d48'],
    motionStyle: 'Gentle easing, warm feel, slightly longer timing',
    release: 'Ships in v1.1.0',
    available: false,
  },
  {
    id: 'signal-bloom',
    name: 'Signal Bloom',
    feel: 'Most design-forward and memorable, still controlled for academic use.',
    fonts: {
      display: 'Fraunces',
      heading: 'Plus Jakarta Sans',
      body: 'Hind',
      mono: 'Recursive',
    },
    iconFamily: 'Remix Icon',
    colors: ['#0c0a09', '#7c3aed', '#fafaf9', '#10b981', '#f59e0b', '#ef4444'],
    motionStyle: 'Spring-like transitions with gentle easing',
    release: 'Ships in v1.1.0',
    available: false,
  },
]
