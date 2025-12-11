import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import obfuscatorPlugin from 'rollup-plugin-obfuscator';

/**
 * Chrome Web Store Vite configuration
 * - Minified and obfuscated for production
 * - Uses manifest.chrome.json
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
      plugins: [
        obfuscatorPlugin({
          global: false,
          options: {
            // Obfuscation options for production
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.5,
            deadCodeInjection: false,
            debugProtection: false,
            disableConsoleOutput: false,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: false,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 10,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 0.5,
            stringArrayEncoding: ['base64'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 1,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 2,
            stringArrayWrappersType: 'variable',
            stringArrayThreshold: 0.75,
            transformObjectKeys: false,
            unicodeEscapeSequence: false,
          },
        }),
      ],
    },
    outDir: 'dist-chrome',
    emptyOutDir: true,
    minify: 'terser',
    target: 'es2020',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        // Copy Chrome manifest
        { src: 'manifest.chrome.json', dest: '.', rename: 'manifest.json' },
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