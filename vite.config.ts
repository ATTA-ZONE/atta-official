import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {vueI18n} from "@intlify/vite-plugin-vue-i18n";
export default defineConfig({
  base: '/',
	// 静态资源路径
	publicDir: 'public',
  plugins: [vue(),
    vueI18n({
    include: path.resolve(__dirname, './src/locals/**')
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
  },
  build: {
		assetsDir: 'src/assets',
		outDir: 'dist',
		cssCodeSplit: true,
		sourcemap: false,
    manifest: false
	}
})