import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,               // Allows Vite to listen on all IPs (necessary for Docker)
    port: 5173,               // Port that Vite is serving on
    allowedHosts: ['fris-dev.com', 'localhost', '0.0.0.0'],  // Add allowed hosts here
  },
})

