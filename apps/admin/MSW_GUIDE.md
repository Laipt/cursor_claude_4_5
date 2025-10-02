# MSW (Mock Service Worker) 迁移完成

## ✅ 迁移总结

已成功将 Mock.js 替换为 **MSW (Mock Service Worker)**，这是一个更现代化、更接近真实网络请求的 API mocking 方案。

## 🎯 MSW 的优势

### 1. **真实的网络请求拦截**
- MSW 在 Service Worker 层面拦截请求，模拟真实的网络行为
- 可以在浏览器 DevTools 的 Network 面板中看到完整的请求/响应
- 更好的调试体验

### 2. **与框架无关**
- 不侵入业务代码
- 可以轻松切换到真实 API，只需停用 MSW
- 同一套 Mock 可用于开发、测试、Storybook 等场景

### 3. **类型安全**
- 完整的 TypeScript 支持
- 请求和响应都有类型提示

### 4. **更好的开发体验**
- 支持 REST API 和 GraphQL
- 可以模拟网络延迟、错误状态
- 热更新支持

## 📁 新的 Mock 目录结构

```
src/mocks/
├── data/                    # Mock 数据
│   ├── users.ts            # 用户数据
│   ├── roles.ts            # 角色数据
│   ├── menus.ts            # 菜单数据
│   ├── dicts.ts            # 字典数据
│   └── configs.ts          # 配置数据
│
├── handlers/               # API 处理器
│   ├── auth.ts            # 认证接口
│   ├── user.ts            # 用户接口
│   ├── role.ts            # 角色接口
│   ├── menu.ts            # 菜单接口
│   ├── dict.ts            # 字典接口
│   ├── config.ts          # 配置接口
│   └── index.ts           # 汇总所有 handlers
│
├── browser.ts             # MSW 浏览器配置
└── index.ts               # Mock 入口
```

## 🔧 技术实现

### 1. Handler 示例

```typescript
// src/mocks/handlers/auth.ts
import { http, HttpResponse } from 'msw'

export const authHandlers = [
  // 登录
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json()
    const { username, password } = body

    if (username === 'admin' && password === 'admin123') {
      return HttpResponse.json({
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock-token-admin-' + Date.now()
        }
      })
    }

    return HttpResponse.json({
      code: 401,
      message: '用户名或密码错误',
      data: null
    }, { status: 401 })
  })
]
```

### 2. 启动配置

```typescript
// src/mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function startMockWorker() {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
    console.log('🚀 MSW (Mock Service Worker) is running')
  }
}
```

### 3. 应用集成

```typescript
// src/main.ts
import { startMockWorker } from './mocks'

startMockWorker().then(() => {
  const app = createApp(App)
  // ... 其他初始化
  app.mount('#app')
})
```

## 🚀 如何使用

### 查看网络请求

1. 打开浏览器 DevTools
2. 切换到 Network 标签
3. 可以看到所有被 MSW 拦截的请求
4. 请求标记为 "from service worker"

### 添加新的 Mock 接口

1. **创建数据文件**（如果需要）
```typescript
// src/mocks/data/products.ts
export const products = [
  { id: 1, name: '产品1', price: 100 },
  { id: 2, name: '产品2', price: 200 }
]
```

2. **创建 Handler**
```typescript
// src/mocks/handlers/product.ts
import { http, HttpResponse } from 'msw'
import { products } from '../data/products'

export const productHandlers = [
  http.get('/api/products', () => {
    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: products
    })
  })
]
```

3. **注册 Handler**
```typescript
// src/mocks/handlers/index.ts
import { productHandlers } from './product'

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...productHandlers  // 添加新的 handlers
]
```

### 模拟网络延迟

```typescript
import { delay, http, HttpResponse } from 'msw'

http.get('/api/slow-endpoint', async () => {
  await delay(2000)  // 延迟 2 秒
  return HttpResponse.json({ data: 'slow response' })
})
```

### 模拟错误响应

```typescript
http.post('/api/fail-endpoint', () => {
  return HttpResponse.json(
    {
      code: 500,
      message: '服务器错误',
      data: null
    },
    { status: 500 }
  )
})
```

## 🔄 切换到真实 API

### 方法 1：环境变量控制

修改 `src/mocks/browser.ts`：

```typescript
export async function startMockWorker() {
  // 只在开发环境且未设置 VITE_USE_REAL_API 时启用 Mock
  if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
    await worker.start(...)
  }
}
```

然后在 `.env.development` 中：
```bash
# 使用 Mock
# VITE_USE_REAL_API=false

# 使用真实 API
VITE_USE_REAL_API=true
```

### 方法 2：注释 Mock 启动

直接在 `src/main.ts` 中注释掉 Mock 启动：

```typescript
// import { startMockWorker } from './mocks'

// startMockWorker().then(() => {
  const app = createApp(App)
  // ...
  app.mount('#app')
// })
```

## 📊 Mock 数据说明

### 用户账号

| 用户名 | 密码 | 角色 | 权限 |
|--------|------|------|------|
| admin | admin123 | 超级管理员 | 所有权限 (*:*:*) |
| user | user123 | 普通用户 | 仅查看权限 |

### 数据特点

- **用户数据**: 包含 20 个测试用户
- **角色数据**: 3 个预设角色（超级管理员、普通角色、访客）
- **菜单数据**: 完整的菜单树结构，包含按钮权限
- **字典数据**: 用户状态、系统状态、性别等基础字典
- **配置数据**: 系统配置项

## 🐛 常见问题

### 1. Service Worker 未注册

**问题**: 控制台显示 "Service Worker registration failed"

**解决**: 
- 确保 `public/mockServiceWorker.js` 文件存在
- 运行 `npx msw init public/ --save` 重新初始化

### 2. 请求未被拦截

**问题**: 请求直接发送到真实服务器

**解决**:
- 检查控制台是否显示 "🚀 MSW (Mock Service Worker) is running"
- 检查 handler 的路径是否与实际请求匹配
- 确保 MSW 在应用启动前初始化完成

### 3. CORS 错误

**问题**: 控制台显示 CORS 相关错误

**解决**:
MSW 拦截请求后不会有 CORS 问题，如果出现说明请求没有被拦截。检查：
- Handler 的 URL 路径
- BaseURL 配置

## 📚 更多资源

- [MSW 官方文档](https://mswjs.io/)
- [MSW GitHub](https://github.com/mswjs/msw)
- [示例集合](https://mswjs.io/docs/examples)

## 🎉 总结

MSW 迁移已完成，现在你可以：

✅ 在 Network 面板中看到完整的请求
✅ 更真实地模拟 API 行为
✅ 轻松切换 Mock 和真实 API
✅ 享受更好的开发体验

试试访问 http://localhost:3000 使用 `admin/admin123` 登录，查看 DevTools 中的网络请求！

