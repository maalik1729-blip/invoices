/* ── Frontend service to talk to the Express backend ─────────────────
   Base URL points to the backend running on port 5000 in dev.        */

const BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://invoices-bbln.onrender.com/api' : 'http://localhost:5000/api')

/**
 * Search for a saved record by sellerName.
 * Returns { found: false } or { found: true, data: {...} }
 */
export async function searchUser(name) {
  try {
    const res = await fetch(`${BASE}/users/search?name=${encodeURIComponent(name)}`)
    if (!res.ok) return { found: false }
    return await res.json()
  } catch {
    return { found: false }
  }
}

/**
 * Upsert (save / update) the full form data to MongoDB.
 * Returns { success: true } or { error: string }
 */
export async function saveUser(formData, items) {
  try {
    const res = await fetch(`${BASE}/users/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, items }),
    })
    return await res.json()
  } catch (err) {
    return { error: err.message }
  }
}

/**
 * Fetch all saved seller names (for autocomplete dropdown).
 */
export async function listUsers() {
  try {
    const res = await fetch(`${BASE}/users/list`)
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}
