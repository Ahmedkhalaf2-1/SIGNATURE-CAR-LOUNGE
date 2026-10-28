import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The Express API (server/) listens on 127.0.0.1:3001; the frontend always calls relative /api/* URLs.
const api = { '/api': { target: 'http://127.0.0.1:3001', changeOrigin: true } }

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: api },
  preview: { proxy: api },
})
