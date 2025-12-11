import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

/**
 * Base Vite configuration for Sidekick AI Extension
 * Used for development builds
 */
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        sidepanel: resolve(__dirname, 'sidepanel.html'),
        background: resolve(__dirname, 'background.js'),
        content: resolve(__dirname, 'content.js'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Keep CSS at root level
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return '[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    target: 'es2020',
    // Generate sourcemaps for development
    sourcemap: process.env.NODE_ENV === 'development',
  },
  plugins: [
    viteStaticCopy({
      targets: [
        // Copy manifest.json for development
        { src: 'manifest.json', dest: '.' },
        // Copy icons
        { src: 'icon16.png', dest: '.' },
        { src: 'icon48.png', dest: '.' },
        { src: 'icon128.png', dest: '.' },
        // Copy ollama-bridge.html (static HTML with inline script)
        { src: 'ollama-bridge.html', dest: '.' },
        // Copy lib folder (pre-bundled ES module)
        { src: 'lib', dest: '.' },
      ],
    }),
  ],
  publicDir: false,
  // Prevent Vite from transforming these as dependencies
  optimizeDeps: {
    exclude: ['@huggingface/inference'],
  },
});