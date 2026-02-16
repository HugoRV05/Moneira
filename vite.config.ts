import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Moneira/' : '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Moneira - Tus Gastos',
        short_name: 'Moneira',
        description: 'Control de gastos neobrutalista para tu Erasmus',
        theme_color: '#FFD700',
        background_color: '#FFD700',
        display: 'standalone',
        orientation: 'portrait',
        icons: []
      }
    })
  ],
}))
