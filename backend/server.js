import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import usersRouter from './routes/users.js'
import groqRouter from './routes/groq.js'

const app  = express()
const PORT = process.env.PORT || 5000

/* ── Middleware ─────────────────────────────────────────────────────── */
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, // Deployed frontend URL
]

app.use(cors({ 
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }, 
  credentials: true 
}))
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
