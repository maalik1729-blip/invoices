import React, { useState } from 'react'
import FormSection, { DEFAULT_ITEMS } from './components/FormSection'
import PreviewSection from './components/PreviewSection'
import ThemesSection from './components/ThemesSection'
import { THEMES, DOCS, buildThemeCSS, applyData } from './data/config'
import { downloadAllAsPDFZip } from './utils/downloadZip'
import './App.css'

/* ── Empty form defaults (no pre-filled data) ─────────────── */
const DEFAULT_FORM = {
  sellerName: '', sellerTagline: '',
  sellerAddr1: '', sellerAddr2: '',
  sellerGST: '', sellerIEC: '', sellerPAN: '',
  sellerEmail: '',
  sellerPhoneCode: '+91', sellerPhoneNum: '', sellerPhone: '',
  sellerProprietor: '', sellerDesignation: '',
  buyerName: '', buyerAddr1: '', buyerAddr2: '',
  buyerCountry: '', buyerEmail: '',
  buyerPhoneCode: '+1', buyerPhoneNum: '', buyerPhone: '',
  piNumber: '', ciNumber: '', poNumber: '',
  maNumber: '', loiNumber: '',
  docDate: '', dispatchDate: '', deliveryDate: '',
  currency: 'USD', incoterms: '', purposeCode: '',
  agreementDuration: '',
  portLoading: '', portDischarge: '',
  shipMode: '', awbNumber: '', countryOrigin: 'India',
  bankName: '', bankBranch: '', bankAccount: '',
  bankIFSC: '', bankAD: '', paymentMethods: '',
  freight: '', insurance: '', gateway: '',
  tax: '', grandTotal: '', amountWords: '',
  advance: '', balance: '',
  nodalName: '', nodalDesig: '',
}

const NAV = [
  { id: 'form',    label: '📝 Fill Details' },
  { id: 'preview', label: '📄 Preview & Download' },
  { id: 'themes',  label: '🎨 Colour Themes' },
]

export default function App() {
  const [activeSection, setActiveSection] = useState('form')
  const [activeTheme, setActiveTheme]     = useState(THEMES[0])
  const [formData, setFormData]           = useState(DEFAULT_FORM)
  const [items, setItems]                 = useState(DEFAULT_ITEMS)
  const [generatedDocs, setGeneratedDocs] = useState({})
  const [viewer, setViewer]               = useState(null)
  const [generating, setGenerating]       = useState(false)
  const [dlProgress, setDlProgress]       = useState(null)

  /* ── Generate documents ───────────────────────────────────── */
  const generateDocuments = async () => {
    setGenerating(true)
    const themeCSS = buildThemeCSS(activeTheme)
    const docData  = {
      ...formData,
      sellerPhone: `${formData.sellerPhoneCode} ${formData.sellerPhoneNum}`.trim(),
      buyerPhone:  `${formData.buyerPhoneCode} ${formData.buyerPhoneNum}`.trim(),
    }
    const results = {}
    await Promise.all(
      DOCS.map(async (doc) => {
        try {
          const res  = await fetch(`/docs/${doc.file}`)
          const html = await res.text()
          let patched = applyData(html, docData)
          patched = patched.replace('</head>',
            `<style id="__seh_theme__">${themeCSS}</style></head>`)
          results[doc.id] = patched
        } catch {
          results[doc.id] = null
        }
      })
    )
    setGeneratedDocs(results)
    setGenerating(false)
    setActiveSection('preview')   // ← auto-navigate to preview
  }

  /* ── Download ZIP ─────────────────────────────────────────── */
  const handleDownloadZip = async () => {
    setDlProgress({ current: 0, total: DOCS.length, name: 'Starting…' })
    try {
      await downloadAllAsPDFZip(generatedDocs, DOCS, (p) => setDlProgress(p))
    } catch (e) {
      alert('Download failed: ' + e.message)
    } finally {
      setDlProgress(null)
    }
  }

  /* ── Section renderer ─────────────────────────────────────── */
  const renderSection = () => {
    switch (activeSection) {
      case 'form':
        return (
          <FormSection
            formData={formData}
            setFormData={setFormData}
            items={items}
            setItems={setItems}
            onGenerate={generateDocuments}
            generating={generating}
          />
        )
      case 'preview':
        return (
          <PreviewSection
            generatedDocs={generatedDocs}
            viewer={viewer}
            setViewer={setViewer}
            onDownloadZip={handleDownloadZip}
            dlProgress={dlProgress}
            onBackToForm={() => setActiveSection('form')}
            generating={generating}
          />
        )
      case 'themes':
        return (
          <ThemesSection
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
          />
        )
      default: return null
    }
  }

  const readyCount = Object.values(generatedDocs).filter(Boolean).length

  return (
    <div className="app">
      {/* ── TOP NAV HEADER ── */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-badge">SEH</div>
          <div>
            <div className="header-brand-title">Document Generator</div>
            <div className="header-brand-sub">Export Admin Panel</div>
          </div>
        </div>

        <nav className="header-nav">
          {NAV.map(n => (
            <button
              key={n.id}
              className={`header-nav-btn ${activeSection === n.id ? 'active' : ''}`}
              onClick={() => setActiveSection(n.id)}
            >
              {n.label}
              {n.id === 'preview' && readyCount > 0 && (
                <span className="nav-badge">{readyCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-theme-chip">
            <span className="theme-dot" style={{ background: activeTheme.navy }} />
            {activeTheme.name}
          </div>
          <button
            className="btn-generate"
            onClick={generateDocuments}
            disabled={generating}
          >
            {generating ? (
              <><span className="ai-spinner" /> Generating…</>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Generate All 12
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  )
}
