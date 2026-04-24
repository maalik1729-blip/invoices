import express from 'express'
import UserData from '../models/UserData.js'

const router = express.Router()

/* ── GET /api/users/search?name=xxx ─────────────────────────────────
   Return the saved record for the given sellerName (case-insensitive).
   Used to auto-fill the form when a returning user types their name.  */
router.get('/search', async (req, res) => {
  const { name } = req.query
  if (!name || name.trim().length < 2) {
    return res.json({ found: false })
  }
  try {
    const record = await UserData.findOne({
      sellerName: { $regex: `^${name.trim()}$`, $options: 'i' },
    }).lean()

    if (!record) return res.json({ found: false })
    return res.json({ found: true, data: record })
  } catch (err) {
    console.error('Search error:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

/* ── POST /api/users/save ────────────────────────────────────────────
   Upsert: if sellerName exists → overwrite with new data,
           else → create new record.                                   */
router.post('/save', async (req, res) => {
  const payload = req.body
  if (!payload?.sellerName?.trim()) {
    return res.status(400).json({ error: 'sellerName is required' })
  }

  try {
    const doc = await UserData.findOneAndUpdate(
      { sellerName: payload.sellerName.trim() },
      { $set: payload },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    return res.json({ success: true, id: doc._id })
  } catch (err) {
    console.error('Save error:', err)
    res.status(500).json({ error: 'Failed to save data' })
  }
})

/* ── GET /api/users/list ─────────────────────────────────────────────
   List all saved seller names (for autocomplete suggestions).         */
router.get('/list', async (_req, res) => {
  try {
    const names = await UserData.find({}, { sellerName: 1, _id: 0 })
                                .sort({ updatedAt: -1 })
                                .limit(50)
                                .lean()
    res.json(names.map(n => n.sellerName))
  } catch (err) {
    console.error('List error:', err)
    res.status(500).json({ error: 'Database error' })
  }
})

export default router
