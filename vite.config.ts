import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/Moneira/',
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
        icons: [] // Simplified icons for now
      }
    })
  ],
})
