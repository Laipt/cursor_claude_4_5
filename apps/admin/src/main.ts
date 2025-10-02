import { createApp } from 'vue'
import App from './App.vue'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// UnoCSS
import 'uno.css'

// NProgress
import 'nprogress/nprogress.css'

// Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Router
import router from './router'

// Directives
import setupDirectives from './directives'

// MSW Mock (已禁用，使用真实后端API)
// import { startMockWorker } from './mocks'

// 直接初始化应用
const app = createApp(App)

// Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// Router
app.use(router)

// Element Plus with Chinese locale
app.use(ElementPlus, {
  locale: zhCn,
})

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Directives
setupDirectives(app)

app.mount('#app')
