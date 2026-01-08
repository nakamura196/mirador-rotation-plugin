// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  esbuild: {
    exclude: [],
    include: [/__tests__\/.*\.(js|jsx)$/, /src\/.*\.jsx?$/],
    loader: 'jsx',
  },
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['__tests__/**/*.test.{js,jsx}'],
    setupFiles: ['./__tests__/setup.jsx'],
  },
});
