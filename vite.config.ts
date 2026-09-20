import { defineConfig } from 'vite';

export default defineConfig({
  base: '/library/',

  server: {
    port: 3000
  },

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: [
          'import',
          'if-function',
          'global-builtin',
          'color-functions'
        ]
      }
    }
  },

  build: {
    outDir: 'dist'
  }
});
