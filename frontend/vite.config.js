import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // Load .env file
  return {
    server:{
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URI,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [react()],
  }
})
