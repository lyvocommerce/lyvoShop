// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://lyvo-be.onrender.com', // твой Render-бэкенд
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
});