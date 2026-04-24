import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import usersRouter from './routes/users.js'
import groqRouter from './routes/groq.js'

const app  = express()
const PORT = process.env.PORT || 5000

/* ── Middleware ─────────────────────────────────────────────────────── */
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '2mb' }))

/* ── Routes ─────────────────────────────────────────────────────────── */
app.use('/api/users', usersRouter)
app.use('/api/groq', groqRouter)

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', time: new Date().toISOString() })
)

/* ── MongoDB connection + server start ──────────────────────────────── */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () =>
      console.log(`🚀 Backend running on http://localhost:${PORT}`)
    )
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })
