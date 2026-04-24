/* ── Groq AI Product Generator ───────────────────────────────
   Uses llama-3.3-70b via Groq API to generate realistic
   export product data from a chosen category.
──────────────────────────────────────────────────────────── */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL    = 'llama-3.3-70b-versatile'

/**
 * generateProducts
 * @param {string} category  - product category
 * @param {number} count     - how many products to generate (1–10)
 * @returns {Promise<Array>} - array of item objects
 */
export async function generateProducts(category, count = 3) {
  const systemPrompt = `You are an expert in Indian consumer electronics and home appliances export documentation.
You generate accurate, realistic product data for B2B export invoices from India to international buyers.
Always return ONLY valid JSON — no markdown, no explanation, no extra text.`

  const userPrompt = `Generate exactly ${count} realistic export products for the category: "${category}".

Rules:
- Products must be real brands sold in India (Samsung, LG, Sony, Philips, Bajaj, Havells, Whirlpool, Bosch, etc.)
- HSN codes must be valid Indian export HSN codes
- Prices must be realistic export USD prices (FOB India)
- Net weight and gross weight must be realistic
- Quantities: 1–10 units per item
- Unit is one of: Pcs, Sets, Nos, Box, Carton

Return ONLY a JSON array like this (no markdown, no extra text):
[
  {
    "desc": "Brand + Full Product Name + Model in parentheses",
    "category": "${category}",
    "model": "exact model number",
    "spec": "Model: <model> | HSN: <hsn>",
    "hsn": "8-digit HSN code as string",
    "qty": "quantity as string number",
    "unit": "Pcs",
    "netWeight": "e.g. 12.5 kg",
    "grossWeight": "e.g. 15.0 kg",
    "unitPrice": "$XX.XX",
    "total": "$XX.XX"
  }
]`

  const res = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt   },
      ],
      temperature: 0.6,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Groq API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  const raw  = data.choices?.[0]?.message?.content || ''

  // Parse — handle both array root and {products:[...]} wrapper
  let parsed = JSON.parse(raw)
  if (Array.isArray(parsed))            return parsed
  if (Array.isArray(parsed.products))   return parsed.products
  if (Array.isArray(parsed.items))      return parsed.items
  // Try to find any array value
  const found = Object.values(parsed).find(v => Array.isArray(v))
  if (found) return found

  throw new Error('Groq returned unexpected JSON structure')
}
