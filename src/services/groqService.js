/* ── Groq AI Product Generator ───────────────────────────────
   Calls the Express backend proxy, which uses llama-3.3-70b
   via Groq API to generate realistic export product data.
──────────────────────────────────────────────────────────── */

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const BACKEND_URL = `${BASE}/groq/generate`

/**
 * generateProducts
 * @param {string} category  - product category
 * @param {number} count     - how many products to generate (1–10)
 * @returns {Promise<Array>} - array of item objects
 */
export async function generateProducts(category, count = 3) {
  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category, count }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown server error' }))
    throw new Error(err.error || 'Failed to generate products from backend')
  }

  const data = await res.json()
  return data.products || []
}
