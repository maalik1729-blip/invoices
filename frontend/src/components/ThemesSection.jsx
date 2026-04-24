import React from 'react'
import { THEMES } from '../data/config'

export default function ThemesSection({ activeTheme, setActiveTheme }) {
  return (
    <section className="section active" id="section-themes">
      <div className="section-header">
        <h1 className="section-title">Colour Themes</h1>
        <p className="section-desc">
          Select a theme to apply to all 12 documents. Only colours change — fonts, sizes, and alignments stay identical.
        </p>
      </div>

      <div className="themes-grid">
        {THEMES.map(t => (
          <div
            key={t.id}
            className={`theme-card ${t.id === activeTheme.id ? 'selected' : ''}`}
            onClick={() => setActiveTheme(t)}
          >
            <div className="theme-preview">
              <div
                className="theme-stripe"
                style={{ background: `linear-gradient(90deg,${t.s1} 60%,${t.s2} 60%)` }}
              />
              <div className="theme-header" style={{ background: t.silver }}>
                <div className="theme-swatch-main"  style={{ background: t.navy }} />
                <div className="theme-swatch-accent" style={{ background: t.red }} />
                <div className="theme-swatch-accent" style={{ background: t.gold, marginLeft: 4 }} />
              </div>
            </div>
            <div className="theme-body">
              <div>
                <div className="theme-name">{t.name}</div>
                <div className="theme-desc">{t.desc}</div>
              </div>
              <div className="theme-check">✓</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
