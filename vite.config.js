import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ ESM format — compatible with "type": "module"
export default defineConfig({
  plugins: [react()],
})
