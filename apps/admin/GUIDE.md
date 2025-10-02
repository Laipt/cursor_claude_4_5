# 后台管理系统 - 使用指南

## 🎉 项目已成功创建！

这是一个基于 **Vue 3 + TypeScript + Element Plus + UnoCSS** 的现代化后台管理系统。

## 📦 已实现的功能

### ✅ 核心功能模块

1. **用户登录系统**
   - JWT Token 认证
   - 登录表单验证
   - 自动路由跳转
   - Token 持久化存储

2. **用户管理模块**
   - 用户列表（分页、搜索、排序）
   - 新增/编辑/删除用户
   - 批量删除
   - 用户角色分配（多选）
   - 密码重置功能
   - 按钮级权限控制

3. **角色管理模块**
   - 角色列表管理
   - 角色CRUD操作
   - 菜单权限分配（树形选择器）
   - 角色状态管理

4. **菜单管理模块**
   - 树形菜单展示
   - 支持三种菜单类型：
     - **M** - 目录（一级菜单）
     - **C** - 菜单（页面路由）
     - **F** - 按钮（按钮权限）
   - 菜单图标选择
   - 路由配置
   - 权限标识配置

5. **字典管理模块**
   - 字典类型管理
   - 字典数据管理
   - 字典状态控制

6. **配置管理模块**
   - 系统配置管理
   - 业务配置管理
   - 配置分类

### ✅ 权限系统 (RBAC)

**权限模型**
```
用户 (User) ←→ 角色 (Role) ←→ 菜单 (Menu)
    1 : N             1 : N
```

**权限控制**
- **页面级权限**: 通过动态路由实现
- **按钮级权限**: 使用 `v-permission` 自定义指令

**使用示例**
```vue
<!-- 按钮权限控制 -->
<el-button v-permission="['system:user:add']">新增用户</el-button>
<el-button v-permission="['system:user:edit']">编辑用户</el-button>
<el-button v-permission="['system:user:delete']">删除用户</el-button>
```

### ✅ 布局系统

**完整的后台布局**
- 侧边栏菜单（可折叠）
- 顶部导航栏
- 面包屑导航
- 标签页（Tab）导航
- 用户信息下拉菜单

**布局特性**
- 响应式设计
- 路由缓存（keep-alive）
- 标签页右键菜单（刷新、关闭其他、关闭所有）
- 侧边栏展开/折叠动画

## 🚀 快速开始

### 1. 安装依赖

```bash
cd apps/admin
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

服务将在 http://localhost:3000 启动

### 3. 登录系统

#### 管理员账号
- **用户名**: `admin`
- **密码**: `admin123`
- **权限**: 所有权限（超级管理员）

#### 普通用户
- **用户名**: `user`
- **密码**: `user123`
- **权限**: 仅查看权限

### 4. 构建生产版本

```bash
pnpm build
```

构建文件将生成在 `dist` 目录

### 5. 预览生产构建

```bash
pnpm preview
```

## 📁 项目结构

```
apps/admin/
├── public/               # 静态资源
├── src/
│   ├── api/             # API 接口
│   │   ├── auth.ts      # 认证接口
│   │   ├── user.ts      # 用户接口
│   │   ├── role.ts      # 角色接口
│   │   ├── menu.ts      # 菜单接口
│   │   ├── dict.ts      # 字典接口
│   │   └── config.ts    # 配置接口
│   │
│   ├── assets/          # 资源文件
│   │
│   ├── components/      # 通用组件
│   │
│   ├── composables/     # 组合式函数
│   │
│   ├── directives/      # 自定义指令
│   │   ├── permission.ts    # 权限指令
│   │   └── index.ts         # 指令入口
│   │
│   ├── layouts/         # 布局组件
│   │   ├── DefaultLayout.vue   # 主布局
│   │   ├── Sidebar.vue         # 侧边栏
│   │   ├── MenuItem.vue        # 菜单项
│   │   ├── Header.vue          # 顶部栏
│   │   ├── Breadcrumb.vue      # 面包屑
│   │   └── TagsView.vue        # 标签页
│   │
│   ├── mock/            # Mock 数据
│   │   ├── user.ts      # 用户 Mock
│   │   ├── role.ts      # 角色 Mock
│   │   ├── menu.ts      # 菜单 Mock
│   │   ├── dict.ts      # 字典 Mock
│   │   ├── config.ts    # 配置 Mock
│   │   └── index.ts     # Mock 入口
│   │
│   ├── router/          # 路由配置
│   │   ├── index.ts     # 路由实例
│   │   ├── routes.ts    # 静态路由
│   │   └── guards.ts    # 路由守卫
│   │
│   ├── stores/          # Pinia 状态管理
│   │   ├── user.ts      # 用户状态
│   │   ├── permission.ts # 权限状态
│   │   └── app.ts       # 应用状态
│   │
│   ├── types/           # TypeScript 类型定义
│   │   ├── common.ts    # 通用类型
│   │   ├── user.ts      # 用户类型
│   │   ├── role.ts      # 角色类型
│   │   ├── menu.ts      # 菜单类型
│   │   ├── dict.ts      # 字典类型
│   │   └── config.ts    # 配置类型
│   │
│   ├── utils/           # 工具函数
│   │   ├── request.ts   # Axios 封装
│   │   ├── auth.ts      # 认证工具
│   │   ├── permission.ts # 权限判断
│   │   ├── validate.ts  # 表单验证
│   │   └── tree.ts      # 树形数据处理
│   │
│   ├── views/           # 页面组件
│   │   ├── login/       # 登录页
│   │   │   └── index.vue
│   │   ├── home/        # 首页
│   │   │   └── index.vue
│   │   ├── system/      # 系统管理
│   │   │   ├── user/    # 用户管理
│   │   │   ├── role/    # 角色管理
│   │   │   ├── menu/    # 菜单管理
│   │   │   ├── dict/    # 字典管理
│   │   │   └── config/  # 配置管理
│   │   └── 404.vue      # 404 页面
│   │
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
│
├── .env.development     # 开发环境变量
├── .env.production      # 生产环境变量
├── vite.config.ts       # Vite 配置
├── uno.config.ts        # UnoCSS 配置
├── tsconfig.json        # TypeScript 配置
├── package.json         # 项目配置
└── README.md            # 项目说明
```

## 🎨 技术栈

### 核心框架
- **Vue 3.5** - 渐进式 JavaScript 框架
- **TypeScript 5.8** - JavaScript 的超集
- **Vite 7** - 下一代前端构建工具

### UI 框架
- **Element Plus 2.11** - Vue 3 组件库
- **UnoCSS** - 即时原子化 CSS 引擎
- **Element Plus Icons** - 图标库

### 状态管理
- **Pinia 3.0** - Vue 官方状态管理库
- **pinia-plugin-persistedstate** - 状态持久化插件

### 路由
- **Vue Router 4.5** - Vue 官方路由

### HTTP 请求
- **Axios 1.12** - HTTP 客户端
- **Mock.js 1.1** - 数据模拟

### 其他
- **NProgress** - 进度条
- **TypeScript 严格模式** - 类型安全

## 🔧 核心特性

### 1. UnoCSS 原子化 CSS

项目完全使用 UnoCSS 实现样式，常用类名：

**布局**
```html
<div class="flex items-center justify-center">居中布局</div>
<div class="flex-between">两端对齐</div>
<div class="grid grid-cols-4 gap-4">栅格布局</div>
```

**间距**
```html
<div class="p-4 m-4">内外边距</div>
<div class="px-2 py-2">水平垂直边距</div>
```

**尺寸**
```html
<div class="w-full h-screen">全宽满屏高</div>
<div class="w-64">固定宽度</div>
```

**颜色**
```html
<div class="bg-white text-gray-700">白底灰字</div>
<div class="bg-primary text-white">主题色</div>
```

### 2. 表单验证

提供丰富的验证规则：

```typescript
import { requiredRule, emailRule, phoneRule, passwordRule } from '@/utils/validate'

const formRules = {
  username: [requiredRule('请输入用户名'), usernameRule],
  email: [emailRule],
  phone: [phoneRule],
  password: [passwordRule]
}
```

**可用验证规则**
- `requiredRule` - 必填验证
- `emailRule` - 邮箱格式验证
- `phoneRule` - 手机号验证
- `passwordRule` - 密码强度验证
- `usernameRule` - 用户名验证
- `urlRule` - URL 格式验证

### 3. 动态路由

**路由加载流程**

1. 用户登录成功
2. 获取用户信息和权限
3. 根据权限动态生成路由
4. 添加路由到路由表
5. 渲染侧边栏菜单

**代码示例**
```typescript
// stores/permission.ts
async function generateRoutes() {
  const menuTree = await getMenuTree()
  const routes = generateRoutesFromMenus(menuTree)
  routes.forEach(route => {
    router.addRoute('/', route)
  })
  return routes
}
```

### 4. Mock 数据

使用 Mock.js 模拟后端接口，开发时无需后端即可运行。

**Mock 数据位置**: `src/mock/`

**连接真实后端**: 删除 `main.ts` 中的 `import './mock'` 即可

### 5. 权限指令

**在组件中使用**
```vue
<template>
  <!-- 单个权限 -->
  <el-button v-permission="['system:user:add']">新增</el-button>
  
  <!-- 多个权限（满足任意一个即可） -->
  <el-button v-permission="['system:user:edit', 'system:user:update']">
    编辑
  </el-button>
</template>
```

**在代码中判断**
```typescript
import { hasPermission } from '@/utils/permission'

if (hasPermission(['system:user:delete'])) {
  // 有删除权限
}
```

## 📝 开发规范

### 组件开发
```vue
<template>
  <!-- 使用 UnoCSS 原子类 -->
  <div class="p-4 flex items-center">
    <el-button>按钮</el-button>
  </div>
</template>

<script setup lang="ts">
// 使用组合式 API
import { ref, reactive } from 'vue'

const count = ref(0)
const state = reactive({ name: '' })
</script>
```

### API 调用
```typescript
import { getUserList } from '@/api/user'

async function loadData() {
  const data = await getUserList({ pageNum: 1, pageSize: 10 })
  console.log(data)
}
```

### 状态管理
```typescript
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
await userStore.loginAction({ username: 'admin', password: 'admin123' })
```

## 🔐 权限标识规范

格式：`模块:功能:操作`

**示例**
```
system:user:list    # 用户列表查看
system:user:add     # 用户新增
system:user:edit    # 用户编辑
system:user:delete  # 用户删除

system:role:list    # 角色列表
system:role:assign  # 分配角色权限
```

## 📖 环境变量

创建 `.env.development` 和 `.env.production` 文件（已自动创建）：

```bash
# 开发环境
VITE_APP_TITLE=后台管理系统
VITE_APP_BASE_API=/api
VITE_APP_MODE=development
```

## 🐛 常见问题

### 1. 登录后没有菜单？

检查用户的角色是否分配了菜单权限。

### 2. 按钮权限不生效？

确认角色已分配对应的按钮权限（菜单类型为 F 的权限）。

### 3. 路由跳转后页面空白？

检查菜单配置的 `component` 路径是否正确。

### 4. Mock 数据不生效？

确认 `main.ts` 中已导入 `'./mock'`。

## 📚 相关文档

- [Vue 3 文档](https://cn.vuejs.org/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [UnoCSS 文档](https://unocss.dev/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Vue Router 文档](https://router.vuejs.org/zh/)

## 🎯 下一步

1. **连接真实后端**
   - 删除 Mock 导入
   - 修改 API 基础地址
   - 调整接口响应格式

2. **扩展功能**
   - 添加更多业务模块
   - 完善权限控制
   - 优化用户体验

3. **性能优化**
   - 路由懒加载
   - 组件按需加载
   - 图片压缩和懒加载

4. **部署上线**
   - 构建生产版本
   - 配置 Nginx
   - 设置环境变量

---

**祝你使用愉快！** 🎉

