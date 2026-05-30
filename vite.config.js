import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-static-portfolio',
      configureServer(server) {
        const portfolioIndex = path.resolve(__dirname, 'portfolio/index.html')

        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0]

          if (url === '/portfolio.html') {
            res.statusCode = 301
            res.setHeader('Location', '/portfolio')
            res.end()
            return
          }

          if (url !== '/portfolio' && url !== '/portfolio/') {
            next()
            return
          }

          fs.promises
            .readFile(portfolioIndex, 'utf8')
            .then((html) => server.transformIndexHtml(url, html))
            .then((html) => {
              res.statusCode = 200
              res.setHeader('Content-Type', 'text/html')
              res.end(html)
            })
            .catch(next)
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
      '^/port/': 'http://localhost:4001'
    }
  }
})
