import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {vueI18n} from "@intlify/vite-plugin-vue-i18n";
export default defineConfig({
  base: './',
	// 静态资源路径
	publicDir: 'public',
  plugins: [vue(),
    vueI18n({
    include: path.resolve(__dirname, './src/locales/**')
  })],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  build: {
		// 最终构建的浏览器兼容目标
		target: 'modules',
		// 输出路径
		outDir: 'dist',
		// 静态资源大小限制,小于此阈值的导入或引用资源将内联为base64编码
		assetsInlineLimit: 4096,
		// css代码拆分
		cssCodeSplit: true,
		// 构建后是否生成sourcemap文件
		sourcemap: false
	}
})