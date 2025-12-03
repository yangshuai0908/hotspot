import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/hotspot/', // GitHub Pages 仓库名称
  server: {
    proxy: {
      '/api': {
        target: 'https://hot.baiwumm.com/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/xzdx-api': {
        target: 'https://xzdx.top/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/xzdx-api/, '')
      }
    }
  }
})
