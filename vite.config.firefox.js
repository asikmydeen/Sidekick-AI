import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

/**
 * Firefox Add-ons (AMO) Vite configuration
 * - Minified but NOT obfuscated (AMO requirement for code review)
 * - Uses manifest.firefox.json
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
    outDir: 'dist-firefox',
    emptyOutDir: true,
    minify: 'terser',
    target: 'es2020',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
      mangle: false, // Keep variable names readable for AMO review
      format: {
        comments: false,
        beautify: false,
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        // Copy Firefox manifest
        { src: 'manifest.firefox.json', dest: '.', rename: 'manifest.json' },
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
  optimizeDeps: {
    exclude: ['@huggingface/inference'],
  },
});