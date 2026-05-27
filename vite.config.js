import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
  environment: "jsdom",
  setupFiles: ["@testing-library/jest-dom/vitest"],
  globals: true,
  include: ["src/__tests__/**/*.test.jsx"],
  },
});
