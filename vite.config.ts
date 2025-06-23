import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
//引入svg需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : '/Vue-1-admin/',
    plugins: [
      vue(),
      vueDevTools(), // 添加 Vue Devtools 插件
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
      viteMockServe({
        //保证开发阶段可以使用mock接口
        })
    ],
      resolve: {
      alias: {
        '@': path.resolve('src')
      },
    },

    //scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          //javascriptEnabled: true,
          additionalData: `
          @import "@/styles/variable.scss";
          `
        }
      }
    }
  }
})

