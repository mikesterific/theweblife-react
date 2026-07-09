import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-html-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0]
          if (url === '/portfolio.html') {
            res.statusCode = 301
            res.setHeader('Location', '/portfolio')
            res.end()
            return
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@c': path.resolve(__dirname, './src/components')
    }
  },
  server: {
    port: 4005,
    proxy: {
      '^/port/': 'http://localhost:4001',
      '^/portfolio-quest(?:/|$)': 'http://localhost:4001',
      '^/api/': 'http://localhost:4001'
    }
  }
})
