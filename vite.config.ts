import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml', '404.html'],
      manifest: {
        name: 'Смаколик — Сучасна Книга Рецептів',
        short_name: 'Смаколик',
        description: 'Сучасний кулінарний портал: розумний пошук за холодильником, рецепти, списки покупок та статті',
        theme_color: '#ea580c',
        background_color: '#fafaf9',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: process.env.NODE_ENV === 'production' ? '/ReceptSite/' : '/',
        start_url: process.env.NODE_ENV === 'production' ? '/ReceptSite/' : '/',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍲</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍲</text></svg>',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/ReceptSite/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-utils': ['canvas-confetti', 'clsx', 'tailwind-merge']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});
