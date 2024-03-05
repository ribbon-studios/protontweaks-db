import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  server: {
    port: 3030,
    hmr: true,
    proxy: {
      '/api': {
        target: 'https://tweaks.rains.cafe/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    environment: 'happy-dom',
  },
  plugins: [react()],
});
