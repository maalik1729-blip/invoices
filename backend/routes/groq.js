import express from 'express'

const router = express.Router()

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL    = 'llama-3.3-70b-versatile'

router.post('/generate', async (req, res) => {
  const { category, count } = req.body
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'Server missing Groq API Key' })
  }

  const systemPrompt = `You are an expert in Indian consumer electronics and home appliances export documentation.
You generate accurate, realistic product data for B2B export invoices from India to international buyers.
Always return ONLY valid JSON — no markdown, no explanation, no extra text.`

  const userPrompt = `Generate exactly ${count || 3} realistic export products for the category: "${category || 'Consumer Electronics'}".

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
    "category": "${category || 'Consumer Electronics'}",
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

  try {
    const groqRes = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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

    if (!groqRes.ok) {
      const err = await groqRes.text()
      throw new Error(`Groq API error ${groqRes.status}: ${err}`)
    }

    const data = await groqRes.json()
    const raw  = data.choices?.[0]?.message?.content || ''

    // Parse — handle both array root and {products:[...]} wrapper
    let parsed = JSON.parse(raw)
    let products = []
    
    if (Array.isArray(parsed)) {
        products = parsed
    } else if (Array.isArray(parsed.products)) {
        products = parsed.products
    } else if (Array.isArray(parsed.items)) {
        products = parsed.items
    } else {
        const found = Object.values(parsed).find(v => Array.isArray(v))
        if (found) products = found
        else throw new Error('Groq returned unexpected JSON structure')
    }

    res.json({ products })

  } catch (err) {
    console.error('Groq Error:', err)
    res.status(500).json({ error: err.message || 'Failed to generate products' })
  }
})

export default router
