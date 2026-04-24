import React, { useRef } from 'react'
import { DOCS } from '../data/config'

export default function PreviewSection({
  generatedDocs, viewer, setViewer,
  onDownloadZip, dlProgress, onBackToForm, generating,
}) {
  const frameRef = useRef(null)
  const readyCount = Object.values(generatedDocs).filter(Boolean).length

  const openDoc = (doc) => {
    const html = generatedDocs[doc.id]
    if (!html) return
    setViewer({ id: doc.id, name: doc.name, html })
  }

  const printDoc = () => {
    try { frameRef.current?.contentWindow?.print() } catch (e) {}
  }

  const badge = (id) => {
    if (!(id in generatedDocs))
      return <div className="doc-card-badge pending">⟳ Not generated</div>
    if (!generatedDocs[id])
      return <div className="doc-card-badge error">✕ Error</div>
    return <div className="doc-card-badge ready">✓ Ready</div>
  }

  /* ── Empty / generating state ── */
  if (generating) {
    return (
      <section className="section active">
        <div className="preview-empty">
          <div className="preview-empty-icon">⚙️</div>
          <div className="preview-empty-title">Generating Documents…</div>
          <div className="preview-empty-sub">Please wait while all 12 documents are being prepared.</div>
          <div className="ai-loading-bar" style={{ width: 320, marginTop: 20 }}>
            <div className="ai-loading-fill" />
          </div>
        </div>
      </section>
    )
  }

  if (readyCount === 0) {
    return (
      <section className="section active">
        <div className="preview-empty">
          <div className="preview-empty-icon">📄</div>
          <div className="preview-empty-title">No Documents Yet</div>
          <div className="preview-empty-sub">
            Fill in your details and click <strong>Generate All 12</strong> to create your export documents.
          </div>
          <button className="btn-back-form" onClick={onBackToForm}>
            ← Go to Form
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="section active" id="section-preview">

      {/* ── ACTION BAR ── */}
      <div className="preview-action-bar">
        <div className="preview-stats">
          <span className="preview-count">{readyCount} / {DOCS.length}</span>
          <span className="preview-count-label">documents ready</span>
        </div>

        <div className="preview-action-btns">
          <button className="btn-back-form" onClick={onBackToForm}>
            ← Back to Form
          </button>

          <button
            className={`btn-zip-download ${dlProgress ? 'loading' : ''}`}
            onClick={onDownloadZip}
            disabled={!!dlProgress || readyCount === 0}
          >
            {dlProgress ? (
              <>
                <span className="ai-spinner" />
                {dlProgress.name} ({dlProgress.current}/{dlProgress.total})
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download All 12 as ZIP (PDF)
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── ZIP PROGRESS BAR ── */}
      {dlProgress && (
        <div className="zip-progress-wrap">
          <div className="zip-progress-label">
            Rendering PDF {dlProgress.current} of {dlProgress.total}: <strong>{dlProgress.name}</strong>
          </div>
          <div className="zip-progress-track">
            <div
              className="zip-progress-fill"
              style={{ width: `${(dlProgress.current / dlProgress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ── DOCUMENT GRID ── */}
      <div className="docs-grid">
        {DOCS.map(doc => (
          <div
            key={doc.id}
            className={`doc-card ${generatedDocs[doc.id] ? 'clickable' : ''}`}
            onClick={() => openDoc(doc)}
          >
            <div className="doc-card-icon">{doc.icon}</div>
            <div className="doc-card-name">{doc.name}</div>
            <div className="doc-card-type">SEH Export Document</div>
            {badge(doc.id)}
          </div>
        ))}
      </div>

      {/* ── IFRAME VIEWER MODAL ── */}
      {viewer && (
        <div className="doc-viewer">
          <div className="viewer-toolbar">
            <span className="viewer-title">{viewer.name}</span>
            <div className="viewer-actions">
              <button className="btn-print" onClick={printDoc}>🖨 Print / Save PDF</button>
              <button className="btn-close-viewer" onClick={() => setViewer(null)}>✕ Close</button>
            </div>
          </div>
          <iframe
            ref={frameRef}
            srcDoc={viewer.html}
            style={{ flex: 1, border: 'none', background: '#f0f0f0' }}
            title={viewer.name}
          />
        </div>
      )}
    </section>
  )
}
