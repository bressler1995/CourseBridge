import mdx from '@mdx-js/rollup';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: '/os101-dev-preview/',
  plugins: [
    {enforce: 'pre', ...mdx(/* jsxImportSource: …, otherOptions… */)},
    react({include: /\.(jsx|js|mdx|md|tsx|ts)$/})
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 8080
  },
})
