import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@c': path.resolve(__dirname, './src/components')
    }
  },
  server: {
    port: 4005,
    proxy: {
      '/port': 'http://localhost:4001'
    }
  }
})
