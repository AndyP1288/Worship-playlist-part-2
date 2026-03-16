import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Worship Song Library',
        short_name: 'WorshipSongs',
        description: 'Worship song manager with Supabase Auth, DB, and PDF storage.',
        theme_color: '#111827',
        background_color: '#f3f4f6',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      }
    })
  ]
});
