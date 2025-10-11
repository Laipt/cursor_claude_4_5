import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:uno.css'
import { ElLoadingDirective } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { startMockWorker } from './mocks/browser'
import { setPaginationFieldNames } from '@/components/table/table'

import App from './App.vue'
import router from './router'
import setupDirectives from './directives'

setPaginationFieldNames({
  requestFieldNames: {
    current: 'pageNum',
  },
})

startMockWorker().then(() => {
  const app = createApp(App)

  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  app.use(pinia)
  app.use(router)
  app.directive('loading', ElLoadingDirective)

  // 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  // Directives
  setupDirectives(app)

  app.mount('#app')
})
