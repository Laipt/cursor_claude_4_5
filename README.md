# Admin System

一个现代化的全栈管理系统，采用 **Monorepo** 架构，前后端共享类型定义。

## 项目架构

```
admin-system/
├── apps/                      # 应用目录
│   ├── admin/                # Vue 3 前端应用
│   └── server/               # NestJS 后端应用
├── packages/                  # 共享包
│   └── shared/               # 共享类型定义
├── package.json              # 根 package.json
└── pnpm-workspace.yaml       # PNPM Workspace 配置
```

## 技术栈

### 前端
- **Vue 3** - 渐进式 JavaScript 框架
- **Element Plus** - UI 组件库
- **Pinia** - 状态管理
- **Vue Router** - 路由管理
- **Axios** - HTTP 客户端
- **UnoCSS** - 原子化 CSS 引擎
- **TypeScript** - 类型安全

### 后端
- **NestJS** - 渐进式 Node.js 框架
- **Prisma** - 现代化 ORM
- **MySQL** - 关系型数据库
- **JWT** - 身份认证
- **BCrypt** - 密码加密
- **TypeScript** - 类型安全

### 共享
- **@admin-system/shared** - 共享类型定义包

## 功能特性

- ✅ **RBAC 权限管理** - 基于角色的访问控制
- ✅ **菜单权限** - 动态菜单和路由
- ✅ **按钮权限** - 细粒度的操作权限控制
- ✅ **用户管理** - 用户 CRUD、角色分配、密码管理
- ✅ **角色管理** - 角色 CRUD、菜单权限配置
- ✅ **菜单管理** - 菜单 CRUD、树形结构
- ✅ **字典管理** - 数据字典管理
- ✅ **配置管理** - 系统参数配置
- ✅ **JWT 认证** - 安全的身份验证
- ✅ **响应式设计** - 适配不同设备

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- MySQL >= 5.7

### 1. 克隆项目

```bash
git clone <repository-url>
cd admin-system
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置数据库

创建 MySQL 数据库：

```sql
CREATE DATABASE admin_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

配置后端环境变量（`apps/server/.env`）：

```env
DATABASE_URL="mysql://username:password@localhost:3306/admin_system"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### 4. 初始化数据库

```bash
cd apps/server
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

初始管理员账号：
- 用户名：`admin`
- 密码：`admin123`

### 5. 启动项目

**方式一：同时启动前后端**

```bash
# 在根目录
pnpm dev
```

**方式二：分别启动**

```bash
# 启动后端（终端1）
pnpm dev:server

# 启动前端（终端2）
pnpm dev:admin
```

访问地址：
- 前端：http://localhost:5173
- 后端：http://localhost:3000

## 项目说明

### Workspace 结构

本项目使用 PNPM Workspace 管理 Monorepo：

- **apps/admin** - Vue 3 前端应用
- **apps/server** - NestJS 后端应用
- **packages/shared** - 共享类型定义包，被前后端引用

### 类型共享

前后端通过 `@admin-system/shared` 包共享类型定义：

```typescript
// 后端使用
import { User, PageResult } from '@admin-system/shared';

// 前端也可以使用（需配置）
import { User, PageResult } from '@admin-system/shared';
```

### 权限系统

#### 后端权限控制

```typescript
// 跳过认证
@Public()
@Post('login')
async login() { ... }

// 需要特定权限
@Get('list')
@RequirePermissions('system:user:list')
findAll() { ... }
```

#### 前端权限控制

```vue
<!-- 按钮权限指令 -->
<el-button v-permission="['system:user:add']">新增</el-button>

<!-- 或使用函数 -->
<el-button v-if="hasPermission('system:user:add')">新增</el-button>
```

### API 规范

所有接口返回统一格式：

```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

分页查询参数：

```typescript
{
  "pageNum": 1,
  "pageSize": 10,
  "...": "其他查询条件"
}
```

分页返回格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [...],
    "total": 100,
    "pageNum": 1,
    "pageSize": 10
  }
}
```

## 可用脚本

### 根目录

```bash
pnpm dev              # 同时启动前后端
pnpm dev:admin        # 仅启动前端
pnpm dev:server       # 仅启动后端
pnpm build:admin      # 构建前端
pnpm build:server     # 构建后端
```

### 后端（apps/server）

```bash
pnpm dev              # 开发模式
pnpm build            # 构建
pnpm start:prod       # 生产模式
pnpm prisma:generate  # 生成 Prisma Client
pnpm prisma:migrate   # 运行数据库迁移
pnpm prisma:studio    # 打开 Prisma Studio
pnpm prisma:seed      # 运行种子数据
```

### 前端（apps/admin）

```bash
pnpm dev              # 开发模式
pnpm build            # 构建
pnpm preview          # 预览构建结果
```

## 目录结构

```
.
├── apps/
│   ├── admin/                    # 前端应用
│   │   ├── src/
│   │   │   ├── api/             # API 接口
│   │   │   ├── components/      # 组件
│   │   │   ├── layouts/         # 布局
│   │   │   ├── router/          # 路由
│   │   │   ├── stores/          # 状态管理
│   │   │   ├── types/           # 类型定义
│   │   │   ├── utils/           # 工具函数
│   │   │   └── views/           # 页面视图
│   │   └── package.json
│   └── server/                   # 后端应用
│       ├── prisma/
│       │   ├── schema.prisma    # 数据库模型
│       │   └── seed.ts          # 种子数据
│       ├── src/
│       │   ├── auth/            # 认证模块
│       │   ├── common/          # 公共模块
│       │   ├── modules/         # 业务模块
│       │   ├── prisma/          # Prisma 服务
│       │   ├── app.module.ts    # 根模块
│       │   └── main.ts          # 入口文件
│       └── package.json
├── packages/
│   └── shared/                   # 共享类型包
│       ├── src/
│       │   ├── types/           # 类型定义
│       │   └── index.ts         # 导出文件
│       └── package.json
├── package.json                  # 根配置
├── pnpm-workspace.yaml          # Workspace 配置
└── README.md
```

## 开发指南

### 添加新功能模块

1. **后端添加模块**

```bash
cd apps/server
nest g module modules/your-module
nest g controller modules/your-module
nest g service modules/your-module
```

2. **在共享包中定义类型**

```typescript
// packages/shared/src/types/your-module.ts
export interface YourData {
  id: number;
  name: string;
}
```

3. **前端添加 API 和页面**

```typescript
// apps/admin/src/api/your-module.ts
import request from '@/utils/request';
import { YourData } from '@admin-system/shared';

export function getData(): Promise<YourData[]> {
  return request({ url: '/your-module', method: 'get' });
}
```

### 数据库变更

1. 修改 `apps/server/prisma/schema.prisma`
2. 创建迁移：`pnpm prisma:migrate`
3. 生成客户端：`pnpm prisma:generate`

## 部署

### 前端部署

```bash
cd apps/admin
pnpm build
# 将 dist 目录部署到静态服务器（Nginx、CDN 等）
```

### 后端部署

```bash
cd apps/server
pnpm build
pnpm start:prod
# 或使用 PM2
pm2 start dist/main.js --name admin-server
```

### Docker 部署（可选）

```dockerfile
# Dockerfile 示例
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build:server
CMD ["pnpm", "start:prod"]
```

## 常见问题

### 1. 安装依赖失败

确保使用 PNPM：

```bash
npm install -g pnpm
pnpm install
```

### 2. 数据库连接失败

检查 `apps/server/.env` 中的数据库配置

### 3. JWT 验证失败

- 检查 token 是否已过期
- 确认请求头中包含 `Authorization: Bearer <token>`

### 4. 权限验证失败

- 确认用户已分配角色
- 确认角色已分配相应菜单权限

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📚 文档

详细的项目文档请查看 [docs](./docs/) 目录：

- **[数据库初始化说明](./docs/DATABASE_INITIALIZATION.md)** - 数据库初始化和字典数据详情 ⭐ 新手必读
- **[字典API集成说明](./docs/DICT_API_INTEGRATION.md)** - 字典系统的使用和缓存机制
- **[实施总结](./docs/IMPLEMENTATION_SUMMARY.md)** - 项目实施的完整总结
- **[Shared包集成说明](./docs/SHARED_INTEGRATION.md)** - 前后端类型共享方案

更多文档请访问 [docs/README.md](./docs/README.md)

## License

MIT

## 联系方式

如有问题，请提交 Issue 或联系开发团队。

