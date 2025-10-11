// MSW Browser 配置

// 启动 Service Worker
export async function startMockWorker() {
  if (!import.meta.env.DEV || !import.meta.env.VITE_MOCK) return
  const { handlers } = await import('./handlers')
  const { setupWorker } = await import('msw/browser')
  // 创建 Service Worker
  const worker = setupWorker(...handlers)
  await worker.start({
    onUnhandledRequest: 'bypass', // 对未处理的请求放行
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
  console.log('🚀 MSW (Mock Service Worker) is running')
}
