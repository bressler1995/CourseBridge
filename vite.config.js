import mdx from '@mdx-js/rollup';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from "vite-plugin-singlefile";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false, // https://github.com/svg/svgo/issues/1128
          },
          cleanupIDs: {
            minify: false,
            remove: false,
          },
          convertPathData: false,
        },
      },
      'sortAttrs',
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
        },
      },
    ],
  },
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 65,
  },
  jpeg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 65,
  },
  jpg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 65,
  },
  tiff: {
    // https://sharp.pixelplumbing.com/api-output#tiff
    quality: 65,
  },
  // gif does not support lossless compression
  // https://sharp.pixelplumbing.com/api-output#gif
  gif: {},
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    lossless: true,
  },
  avif: {
    // https://sharp.pixelplumbing.com/api-output#avif
    lossless: true,
  },
  cache: false,
  cacheLocation: undefined,
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    {enforce: 'pre', ...mdx(/* jsxImportSource: …, otherOptions… */)},
    react({include: /\.(jsx|js|mdx|md|tsx|ts)$/}),
    ViteImageOptimizer(DEFAULT_OPTIONS)
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 8080
  },
})
