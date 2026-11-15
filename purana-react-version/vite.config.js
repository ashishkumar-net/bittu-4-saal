import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // files/ holds the exported single-file copies — never scan or watch them.
  optimizeDeps: { entries: ['index.html'] },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['pv-c3e02fab1101-7f3a8d6a-f708-481d-96d7-0a32ad0f5a24.style.dev'],
    watch: { ignored: ['**/files/**', '**/dist/**'] },
  },
})
