// MSW Browser 配置

import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 创建 Service Worker
export const worker = setupWorker(...handlers)

// 启动 Service Worker
export async function startMockWorker() {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: 'bypass', // 对未处理的请求放行
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
    console.log('🚀 MSW (Mock Service Worker) is running')
  }
}

