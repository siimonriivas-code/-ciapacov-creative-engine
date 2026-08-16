export type BrandContract = {
  primary: string
  secondary: string
  accent: string
  surface: string
  surfaceAlt: string
  ink: string
  muted: string
  line: string
  fontFamily: string
  radiusUi: string
}

/** Demo fallback only. Production rendering should map these values from the active Design System. */
export const demoBrand: BrandContract = {
  primary: '#1f4f6d', secondary: '#2f7891', accent: '#78465e', surface: '#ffffff',
  surfaceAlt: '#f3f5f6', ink: '#182127', muted: '#64727a', line: '#dce3e7',
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', radiusUi: '8px',
}

export function brandToCssVars(b: BrandContract) {
  return {
    '--ce-primary': b.primary, '--ce-secondary': b.secondary, '--ce-accent': b.accent,
    '--ce-surface': b.surface, '--ce-surface-alt': b.surfaceAlt, '--ce-ink': b.ink,
    '--ce-muted': b.muted, '--ce-line': b.line, '--ce-font': b.fontFamily, '--ce-radius-ui': b.radiusUi,
  } as React.CSSProperties
}
