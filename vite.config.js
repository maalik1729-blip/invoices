import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-siva-docs',
      configureServer(server) {
        server.middlewares.use('/docs', (req, res, next) => {
          const fileName = req.url.replace(/^\//, '')
          const filePath = path.resolve(__dirname, '..', fileName)
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(fs.readFileSync(filePath, 'utf-8'))
          } else {
            next()
          }
        })
      }
    }
  ],
  server: { port: 5173 }
})
