import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueMacros from 'vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'node:path'
import UnoCSS from 'unocss/vite'

const pathEnv = fileURLToPath(new URL('.', import.meta.url))
const pathSrc = fileURLToPath(new URL('./src', import.meta.url))

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, pathEnv)
  return defineConfig({
    plugins: [
      VueMacros({
        plugins: {
          vue: vue(),
          vueJsx: vueJsx(),
        },
      }),
      vueDevTools(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: [
          path.resolve(pathSrc, 'components') + '/**/index.ts',
          path.resolve(pathSrc, 'utils'),
          path.resolve(pathSrc, 'stores'),
          path.resolve(pathSrc, 'composables'),
        ],
        dts: path.resolve(pathSrc, 'auto-import.d.ts'),
        vueTemplate: true,
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dirs: [path.resolve(pathSrc, 'components')],
        dts: path.resolve(pathSrc, 'components.d.ts'),
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
