import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000' // أي طلب يبدأ بـ /api يذهب للسيرفر
    }
  }
});