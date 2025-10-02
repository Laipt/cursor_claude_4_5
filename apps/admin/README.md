# 后台管理系统

基于 Vue 3 + TypeScript + Element Plus + UnoCSS 开发的后台管理系统。

## 技术栈

- **框架**: Vue 3 + TypeScript
- **UI组件库**: Element Plus
- **CSS框架**: UnoCSS (原子化CSS)
- **状态管理**: Pinia
- **路由**: Vue Router
- **HTTP客户端**: Axios
- **Mock数据**: Mock.js
- **构建工具**: Vite

## 功能模块

- ✅ 用户登录 (JWT认证)
- ✅ 用户管理 (CRUD + 角色分配)
- ✅ 角色管理 (CRUD + 菜单权限分配)
- ✅ 菜单管理 (树形管理 + 路由&按钮权限)
- ✅ 字典管理 (字典类型 + 字典数据)
- ✅ 配置管理 (系统配置 + 业务配置)
- ✅ 权限控制 (页面权限 + 按钮权限)

## 权限系统

### RBAC权限模型

- **用户 ↔ 角色**: 一对多关系
- **角色 ↔ 菜单**: 一对多关系
- **菜单权限**: 包含路由权限和按钮权限

### 权限类型

- **目录 (M)**: 一级菜单，可包含子菜单
- **菜单 (C)**: 页面路由，对应具体页面
- **按钮 (F)**: 按钮权限，控制页面操作按钮

### 权限控制

#### 页面级权限
通过路由守卫实现，登录后根据用户角色动态生成路由。

#### 按钮级权限
使用自定义指令 `v-permission` 控制：

```vue
<el-button v-permission="['system:user:add']">新增</el-button>
<el-button v-permission="['system:user:edit']">编辑</el-button>
<el-button v-permission="['system:user:delete']">删除</el-button>
```

## 项目结构

```
src/
├── api/              # API接口层
├── assets/           # 静态资源
├── components/       # 通用组件
├── composables/      # 组合式函数
├── directives/       # 自定义指令
│   └── permission.ts # 权限指令
├── layouts/          # 布局组件
│   ├── DefaultLayout.vue  # 主布局
│   ├── Sidebar.vue        # 侧边栏
│   ├── Header.vue         # 顶部栏
│   ├── TagsView.vue       # 标签页
│   └── Breadcrumb.vue     # 面包屑
├── mock/             # Mock数据
├── router/           # 路由配置
│   ├── index.ts      # 路由实例
│   ├── routes.ts     # 静态路由
│   └── guards.ts     # 路由守卫
├── stores/           # Pinia状态管理
│   ├── user.ts       # 用户状态
│   ├── permission.ts # 权限状态
│   └── app.ts        # 应用状态
├── types/            # TypeScript类型定义
├── utils/            # 工具函数
│   ├── request.ts    # Axios封装
│   ├── auth.ts       # 认证工具
│   ├── permission.ts # 权限判断
│   ├── validate.ts   # 表单验证
│   └── tree.ts       # 树形数据处理
├── views/            # 页面组件
│   ├── login/        # 登录页
│   ├── home/         # 首页
│   └── system/       # 系统管理
│       ├── user/     # 用户管理
│       ├── role/     # 角色管理
│       ├── menu/     # 菜单管理
│       ├── dict/     # 字典管理
│       └── config/   # 配置管理
├── App.vue
└── main.ts
```

## 安装

```bash
# 安装依赖
pnpm install
```

## 开发

```bash
# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000

## 构建

```bash
# 构建生产环境
pnpm build

# 预览生产构建
pnpm preview
```

## 登录账号

### 管理员账号
- 用户名: `admin`
- 密码: `admin123`
- 权限: 所有权限 (超级管理员)

### 普通用户
- 用户名: `user`
- 密码: `user123`
- 权限: 仅查看权限

## 环境变量

创建 `.env.development` 和 `.env.production` 文件：

```bash
# 开发环境
VITE_APP_TITLE=后台管理系统
VITE_APP_BASE_API=/api
VITE_APP_MODE=development

# 生产环境
VITE_APP_TITLE=后台管理系统
VITE_APP_BASE_API=/api
VITE_APP_MODE=production
```

## 特性

### UnoCSS 使用

项目完全使用 UnoCSS 原子类实现样式，常用类名：

- **布局**: `flex`, `grid`, `flex-center`, `flex-between`
- **间距**: `p-4`, `m-4`, `px-2`, `py-2`
- **尺寸**: `w-full`, `h-screen`, `w-64`
- **颜色**: `bg-white`, `text-gray-700`, `border-gray-300`
- **其他**: `rounded`, `shadow`, `cursor-pointer`

### 表单验证

使用 Element Plus 表单验证，提供常用验证规则：

- 必填验证
- 邮箱格式验证
- 手机号格式验证
- 密码强度验证
- 用户名验证
- URL格式验证

### 动态路由

登录成功后，系统会：
1. 获取用户信息和权限
2. 根据用户角色获取菜单权限
3. 动态生成路由并添加到路由表
4. 渲染侧边栏菜单

### Mock 数据

使用 Mock.js 模拟后端接口，无需后端即可运行。生产环境时移除 Mock 即可连接真实后端。

## 开发规范

1. **组件**: 使用 `<script setup>` 语法
2. **类型**: 所有接口和类型完整定义
3. **样式**: 优先使用 UnoCSS，避免编写 CSS
4. **命名**: 清晰的变量和函数命名
5. **注释**: 关键代码添加注释说明

## 🔄 Mock 方案

项目使用 **MSW (Mock Service Worker)** 进行 API 模拟：

- ✅ 真实的网络请求拦截
- ✅ 可在 DevTools Network 查看请求
- ✅ 类型安全的 Mock 定义
- ✅ 轻松切换到真实 API

详见 `MSW_GUIDE.md`

## License

MIT
