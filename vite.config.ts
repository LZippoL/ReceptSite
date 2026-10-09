import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

const siteBase = process.env.VITE_SITE_BASE || '/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Смаколик — Сучасна Книга Рецептів',
        short_name: 'Смаколик',
        description: 'Сучасний кулінарний портал: розумний пошук за холодильником, рецепти, списки покупок та статті',
        theme_color: '#ea580c',
        background_color: '#fafaf9',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: siteBase,
        start_url: siteBase,
        icons: [
          {
            src: `${siteBase}icon-192.png`,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: `${siteBase}icon-192.png`,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: `${siteBase}icon-512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: `${siteBase}icon-512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: `${siteBase}favicon.svg`,
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globIgnores: ['**/images/recipe-thumbnails/**'],
        runtimeCaching: [{ urlPattern: /\/images\/recipe-thumbnails\//, handler: 'CacheFirst', options: { cacheName: 'recipe-thumbnails', expiration: { maxEntries: 120, maxAgeSeconds: 2592000 }, cacheableResponse: { statuses: [200] } } }],
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: siteBase,
  build: {
    minify: 'terser',
    terserOptions: { format: { comments: false }, compress: { passes: 2 } },
    outDir: process.env.SITE_BUILD_DIR || 'output/cloudflare/build',
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
