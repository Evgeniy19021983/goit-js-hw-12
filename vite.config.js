import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: process.env.NODE_ENV === 'production' ? '/goit-js-hw-12/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
