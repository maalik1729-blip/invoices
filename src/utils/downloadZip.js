import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

/**
 * Renders one HTML string → jsPDF blob (multi-page A4)
 */
async function htmlToPDFBlob(html, docName) {
  const wrapper = document.createElement('div')
  wrapper.style.cssText =
    'position:fixed;top:-99999px;left:-99999px;width:794px;background:#fff;z-index:-1;'
  wrapper.innerHTML = html
  document.body.appendChild(wrapper)

  // Let fonts & styles settle
  await new Promise(r => setTimeout(r, 1800))

  try {
    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 794,
    })

    const imgData   = canvas.toDataURL('image/jpeg', 0.92)
    const pdf       = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
    const pageW     = pdf.internal.pageSize.getWidth()   // 210mm
    const pageH     = pdf.internal.pageSize.getHeight()  // 297mm
    const imgHeight = (canvas.height * pageW) / canvas.width

    let remaining = imgHeight
    let yOffset   = 0

    pdf.addImage(imgData, 'JPEG', 0, yOffset, pageW, imgHeight)
    remaining -= pageH

    while (remaining > 0) {
      yOffset -= pageH
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, yOffset, pageW, imgHeight)
      remaining -= pageH
    }

    return pdf.output('blob')
  } finally {
    document.body.removeChild(wrapper)
  }
}

/**
 * Converts all generated docs → individual PDFs → ZIP download
 * @param {object}   generatedDocs  { [docId]: htmlString }
 * @param {Array}    DOCS           doc metadata array
 * @param {Function} onProgress     ({ current, total, name }) callback
 */
export async function downloadAllAsPDFZip(generatedDocs, DOCS, onProgress) {
  const zip    = new JSZip()
  const folder = zip.folder('SEH_Export_Documents')
  const ready  = DOCS.filter(d => generatedDocs[d.id])

  for (let i = 0; i < ready.length; i++) {
    const doc = ready[i]
    onProgress?.({ current: i + 1, total: ready.length, name: doc.name })

    try {
      const blob = await htmlToPDFBlob(generatedDocs[doc.id], doc.name)
      const safeName = `${String(i + 1).padStart(2, '0')}_${doc.name.replace(/[/\\?%*:|"<>]/g, '-')}.pdf`
      folder.file(safeName, blob)
    } catch (e) {
      console.warn(`PDF failed for ${doc.name}:`, e)
    }
  }

  onProgress?.({ current: ready.length, total: ready.length, name: 'Packing ZIP…' })
  const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
  saveAs(zipBlob, 'SEH_Export_Documents.zip')
}
