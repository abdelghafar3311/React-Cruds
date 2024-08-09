import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.1.0.0",
    port: 8000
  },
  preview: {
    host: "127.5.5.5",
    port: 8080
  }
})
