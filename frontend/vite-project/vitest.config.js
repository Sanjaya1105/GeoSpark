import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    css: false,
    reporters: ['verbose'],
    include: ['src/__tests__/**/*.{test,spec}.{js,jsx}'],
    timeout: 10000,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
}) 