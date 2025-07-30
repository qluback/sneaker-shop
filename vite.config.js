import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        styles: path.resolve(__dirname, 'src/styles/style.scss'),
      },
    },
  },
});