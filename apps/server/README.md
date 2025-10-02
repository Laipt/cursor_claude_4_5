# Admin System Backend

基于 NestJS + Prisma + MySQL 的后端管理系统，提供完整的 RBAC 权限管理功能。

## 技术栈

- **NestJS** - Node.js 后端框架
- **Prisma** - 现代化的 ORM 工具
- **MySQL** - 关系型数据库
- **JWT** - 身份认证
- **BCrypt** - 密码加密
- **TypeScript** - 类型安全

## 功能特性

### 核心功能

- ✅ JWT 认证和授权
- ✅ RBAC 权限管理（角色-菜单权限）
- ✅ @Public() 装饰器跳过认证
- ✅ @RequirePermissions() 装饰器控制权限
- ✅ 管理员拥有所有权限
- ✅ 全局响应拦截器
- ✅ 全局异常过滤器
- ✅ 请求参数验证

### 业务模块

- 👤 **用户管理** - 用户 CRUD、角色分配、密码重置
- 🔐 **角色管理** - 角色 CRUD、菜单权限分配
- 📋 **菜单管理** - 菜单 CRUD、树形结构
- 📚 **字典管理** - 字典类型和字典数据管理
- ⚙️ **配置管理** - 系统配置参数管理

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- MySQL >= 5.7

### 1. 安装依赖

```bash
# 在项目根目录
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并修改配置：

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/admin_system"

# JWT
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
```

### 3. 创建数据库

```sql
CREATE DATABASE admin_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. 运行数据库迁移

```bash
pnpm prisma:migrate
```

### 5. 生成 Prisma Client

```bash
pnpm prisma:generate
```

### 6. 初始化种子数据

```bash
pnpm prisma:seed
```

初始化后会创建：
- 管理员账号：`admin` / `admin123`
- 管理员角色及完整权限
- 基础菜单结构
- 示例字典和配置数据

### 7. 启动开发服务器

```bash
pnpm dev
```

服务器将在 http://localhost:3000 启动。

## API 接口

### 认证接口

#### 登录
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 获取用户信息
```http
GET /auth/userinfo
Authorization: Bearer <token>

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": 1,
    "username": "admin",
    "nickname": "管理员",
    "roles": ["管理员"],
    "permissions": ["system:user:list", ...]
  }
}
```

#### 退出登录
```http
POST /auth/logout
Authorization: Bearer <token>
```

### 用户管理

- `GET /user/list` - 用户列表（分页）
- `GET /user/:id` - 获取用户详情
- `POST /user` - 新增用户
- `PUT /user/:id` - 更新用户
- `DELETE /user/:id` - 删除用户
- `DELETE /user/batch` - 批量删除用户
- `PUT /user/:id/password` - 重置密码

### 角色管理

- `GET /role/list` - 角色列表（分页）
- `GET /role/all` - 所有角色（不分页）
- `GET /role/:id` - 获取角色详情
- `POST /role` - 新增角色
- `PUT /role/:id` - 更新角色
- `DELETE /role/:id` - 删除角色

### 菜单管理

- `GET /menu/list` - 菜单列表
- `GET /menu/tree` - 菜单树（根据用户权限）
- `GET /menu/:id` - 获取菜单详情
- `POST /menu` - 新增菜单
- `PUT /menu/:id` - 更新菜单
- `DELETE /menu/:id` - 删除菜单

### 字典管理

- `GET /dict/list` - 字典类型列表
- `POST /dict` - 新增字典类型
- `PUT /dict/:id` - 更新字典类型
- `DELETE /dict/:id` - 删除字典类型
- `GET /dict/data/list` - 字典数据列表
- `POST /dict/data` - 新增字典数据
- `PUT /dict/data/:dictCode` - 更新字典数据
- `DELETE /dict/data/:dictCode` - 删除字典数据

### 配置管理

- `GET /config/list` - 配置列表
- `GET /config/:id` - 获取配置详情
- `POST /config` - 新增配置
- `PUT /config/:id` - 更新配置
- `DELETE /config/:id` - 删除配置

## 权限系统

### 认证守卫

所有接口默认需要 JWT 认证，使用 `@Public()` 装饰器可以跳过认证：

```typescript
@Public()
@Post('login')
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}
```

### 权限守卫

使用 `@RequirePermissions()` 装饰器控制接口权限：

```typescript
@Get('list')
@RequirePermissions('system:user:list')
findAll(@Query() query: UserQueryDto) {
  return this.userService.findAll(query);
}
```

权限验证规则：
- 管理员（roleKey='admin'）拥有所有权限
- 普通用户需要具有指定的权限标识
- 权限通过角色-菜单关联配置

### 获取当前用户

使用 `@CurrentUser()` 装饰器获取当前登录用户：

```typescript
@Get('profile')
getProfile(@CurrentUser() user: JwtPayload) {
  return this.userService.findOne(user.userId);
}
```

## 数据库管理

### Prisma Studio

可视化数据库管理工具：

```bash
pnpm prisma:studio
```

### 创建迁移

```bash
pnpm prisma:migrate
```

### 重置数据库

```bash
# 警告：这将删除所有数据
npx prisma migrate reset
```

## 项目结构

```
apps/server/
├── prisma/
│   ├── schema.prisma       # Prisma 数据库模型
│   └── seed.ts            # 种子数据脚本
├── src/
│   ├── auth/              # 认证模块
│   │   ├── guards/        # 守卫（JWT、权限）
│   │   ├── jwt.strategy.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── common/            # 通用模块
│   │   ├── decorators/    # 装饰器
│   │   ├── filters/       # 异常过滤器
│   │   └── interceptors/  # 拦截器
│   ├── modules/           # 业务模块
│   │   ├── user/         # 用户管理
│   │   ├── role/         # 角色管理
│   │   ├── menu/         # 菜单管理
│   │   ├── dict/         # 字典管理
│   │   └── config/       # 配置管理
│   ├── prisma/           # Prisma 服务
│   ├── app.module.ts     # 根模块
│   └── main.ts           # 应用入口
├── .env                  # 环境变量
├── .env.example          # 环境变量示例
├── package.json
└── tsconfig.json
```

## 开发建议

### 1. 添加新模块

```bash
nest g module modules/your-module
nest g controller modules/your-module
nest g service modules/your-module
```

### 2. 添加 DTO 验证

使用 `class-validator` 装饰器：

```typescript
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  age: number;
}
```

### 3. 统一响应格式

所有接口自动包装为统一格式：

```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

错误响应：

```json
{
  "code": 400,
  "message": "错误信息",
  "data": null
}
```

## 故障排查

### 1. 数据库连接失败

- 检查 `.env` 中的 `DATABASE_URL` 是否正确
- 确认 MySQL 服务正在运行
- 确认数据库已创建

### 2. JWT 验证失败

- 检查请求头中是否包含 `Authorization: Bearer <token>`
- 确认 token 未过期
- 检查 `JWT_SECRET` 配置

### 3. 权限验证失败

- 确认用户已分配角色
- 确认角色已分配菜单权限
- 检查菜单的权限标识（perms）是否正确

## 生产部署

### 1. 构建应用

```bash
pnpm build
```

### 2. 启动生产服务器

```bash
pnpm start:prod
```

### 3. 环境变量

生产环境建议修改：
- `JWT_SECRET` - 使用强密钥
- `DATABASE_URL` - 生产数据库地址
- `PORT` - 服务端口

### 4. 进程管理

推荐使用 PM2：

```bash
pm2 start dist/main.js --name admin-server
pm2 save
pm2 startup
```

## License

MIT

