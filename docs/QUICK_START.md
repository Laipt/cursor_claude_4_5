# 电商管理系统 - 快速启动指南

## 🎯 系统说明

本系统实现了完整的电商后台管理功能，包括：
- **App用户管理** - 用户信息、余额积分、标签分组
- **商品管理** - 商品CRUD、SKU管理、分类管理
- **订单管理** - 订单流程、发货退款、数据统计

## 📋 环境要求

- Node.js >= 18.x
- MySQL >= 8.0
- pnpm >= 8.x

## 🚀 快速启动

### 1. 安装依赖

```bash
# 安装项目依赖
pnpm install
```

### 2. 数据库配置

确保 MySQL 服务已启动，然后配置数据库连接：

```bash
# apps/server/.env
DATABASE_URL="mysql://root:password@localhost:3306/admin_system"
```

### 3. 初始化数据库

```bash
cd apps/server

# 同步数据库结构
npx prisma db push

# 查看数据库（可选）
npx prisma studio
```

### 4. 启动后端服务

```bash
cd apps/server
npm run dev
```

后端服务运行在：http://localhost:3000

### 5. 启动前端服务

新开一个终端：

```bash
cd apps/admin
npm run dev
```

前端服务运行在：http://localhost:5173

### 6. 登录系统

使用默认管理员账号登录：
- 用户名：`admin`
- 密码：`123456`

## 📁 主要功能路由

登录后可访问以下功能：

| 功能 | 路由 | 说明 |
|------|------|------|
| 首页 | `/home` | 系统首页 |
| App用户管理 | `/app-user` | 管理App端用户 |
| 商品管理 | `/product` | 商品列表和管理 |
| 订单管理 | `/order` | 订单处理和统计 |

## 🔧 API 接口说明

### App用户管理 API

```
GET    /api/admin/app-user/list          # 用户列表
GET    /api/admin/app-user/:id            # 用户详情
PUT    /api/admin/app-user/:id            # 更新用户
PUT    /api/admin/app-user/:id/status     # 更新状态
POST   /api/admin/app-user/adjust-balance # 调整余额
```

### 商品管理 API

```
GET    /api/admin/product/list          # 商品列表
POST   /api/admin/product               # 创建商品
GET    /api/admin/product/:id           # 商品详情
PUT    /api/admin/product/:id           # 更新商品
DELETE /api/admin/product/:id           # 删除商品
GET    /api/admin/category/tree         # 分类树
```

### 订单管理 API

```
GET    /api/admin/order/list              # 订单列表
GET    /api/admin/order/:id               # 订单详情
POST   /api/admin/order/:id/delivery      # 发货
POST   /api/admin/order/:id/refund        # 退款
GET    /api/admin/order/statistics/overview # 统计
```

## 🗄️ 数据库表说明

### 核心表结构

| 表名 | 说明 | 主要字段 |
|------|------|----------|
| `eb_user` | App用户表 | uid, nickname, phone, nowMoney, integral |
| `eb_store_product` | 商品表 | id, storeName, price, stock, sales |
| `eb_store_product_attr_value` | SKU表 | id, productId, suk, stock, price |
| `eb_store_order` | 订单表 | id, orderId, uid, payPrice, status |
| `eb_store_order_info` | 订单商品详情 | id, orderId, productId, payNum |
| `eb_category` | 分类表 | id, pid, name, type |

## 💡 使用示例

### 1. 管理App用户

1. 访问 `/app-user` 路由
2. 搜索用户（支持昵称、手机号、姓名）
3. 筛选用户（状态、等级）
4. 调整余额/积分
5. 启用/禁用用户

### 2. 管理商品

1. 访问 `/product` 路由
2. 查看商品列表
3. 筛选商品（分类、状态）
4. 上架/下架商品
5. 批量操作

### 3. 管理订单

1. 访问 `/order` 路由
2. 切换Tab查看不同状态订单
3. 筛选订单（支付状态、时间范围）
4. 发货操作（输入快递信息）
5. 处理退款

## 🔍 测试数据

系统当前连接的是已有数据库，包含测试数据：

- **用户数据**：已有多个测试用户
- **商品数据**：包含多种分类的商品
- **订单数据**：包含各种状态的订单

## 📊 功能特性

### App用户管理
- ✅ 分页列表展示
- ✅ 多条件搜索筛选
- ✅ 余额/积分在线调整
- ✅ 用户状态管理
- ✅ 标签分组支持

### 商品管理
- ✅ 商品CRUD操作
- ✅ 分类树形管理
- ✅ SKU规格支持
- ✅ 批量上下架
- ✅ 库存管理

### 订单管理
- ✅ 订单Tab切换
- ✅ 快递发货
- ✅ 退款处理
- ✅ 订单统计
- ✅ 多维度筛选

## 🛠️ 开发调试

### 查看 Prisma Studio

```bash
cd apps/server
npx prisma studio
```

在浏览器打开 http://localhost:5555 可视化查看和编辑数据库。

### 查看 API 文档

使用 Postman/Insomnia 导入以下接口进行测试：

**基础URL：** http://localhost:3000/api

**认证方式：** Bearer Token（登录后获取）

### 热更新

- 后端：保存文件后自动重启（nodemon）
- 前端：保存文件后自动刷新（Vite HMR）

## ⚠️ 常见问题

### 1. 数据库连接失败
- 检查 MySQL 服务是否启动
- 验证 `.env` 文件中的数据库配置
- 确认数据库已创建

### 2. 前端请求失败
- 确认后端服务已启动
- 检查前端 API 基础路径配置
- 查看浏览器控制台错误信息

### 3. 登录失败
- 使用默认账号：admin / 123456
- 检查 `sys_user` 表中是否有管理员账号
- 验证 JWT 配置

## 📚 相关文档

- [完整实施文档](./ECOMMERCE_IMPLEMENTATION.md)
- [Prisma文档](https://www.prisma.io/docs/)
- [NestJS文档](https://docs.nestjs.com/)
- [Vue 3文档](https://cn.vuejs.org/)
- [Element Plus文档](https://element-plus.org/)

## 🎉 开始使用

现在你已经完成了所有配置！

访问 http://localhost:5173 开始使用电商管理系统 🚀

---

**提示：** 首次使用建议先熟悉各个功能模块的操作流程，然后可以根据业务需求进行定制开发。


