import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/forgot-password': 'http://localhost:8081',
      '/reset-password': 'http://localhost:8081',
      '/authenticate': 'http://localhost:8081',
      '/register': 'http://localhost:8081',
    }
  }
})
