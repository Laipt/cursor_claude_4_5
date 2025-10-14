# 添加电商模块菜单指南

## 方法一：使用 Prisma Studio（推荐）

1. 启动 Prisma Studio：
```bash
cd apps/server
npx prisma studio
```

2. 在浏览器中打开 http://localhost:5555

3. 选择 `sys_menu` 表，逐个添加以下菜单数据：

### App用户管理模块

#### 1. App用户目录 (menuId: 200)
- menuName: `App用户`
- parentId: `0`
- orderNum: `2`
- path: `/app-user`
- component: `null`
- menuType: `M`
- visible: `1`
- status: `1`
- icon: `User`
- remark: `App用户管理目录`

#### 2. 用户管理 (menuId: 201)
- menuName: `用户管理`
- parentId: `200`
- orderNum: `1`
- path: `index`
- component: `/app-user/index`
- menuType: `C`
- visible: `1`
- status: `1`
- perms: `app:user:list`
- icon: `User`

#### 3. 用户标签 (menuId: 202)
- menuName: `用户标签`
- parentId: `200`
- orderNum: `2`
- path: `tag`
- component: `/app-user/user-tag`
- menuType: `C`
- visible: `1`
- status: `1`
- perms: `app:user:tag:list`
- icon: `PriceTag`

#### 4. 用户等级 (menuId: 203)
- menuName: `用户等级`
- parentId: `200`
- orderNum: `3`
- path: `level`
- component: `/app-user/user-level`
- menuType: `C`
- visible: `1`
- status: `1`
- perms: `app:user:level:list`
- icon: `Star`

#### 5. 用户分组 (menuId: 204)
- menuName: `用户分组`
- parentId: `200`
- orderNum: `4`
- path: `group`
- component: `/app-user/user-group`
- menuType: `C`
- visible: `1`
- status: `1`
- perms: `app:user:group:list`
- icon: `Grid`

### 商品管理模块

#### 6. 商品管理目录 (menuId: 300)
- menuName: `商品管理`
- parentId: `0`
- orderNum: `3`
- path: `/product`
- component: `null`
- menuType: `M`
- visible: `1`
- status: `1`
- icon: `Goods`

#### 7. 商品列表 (menuId: 301)
- menuName: `商品列表`
- parentId: `300`
- orderNum: `1`
- path: `index`
- component: `/product/index`
- menuType: `C`
- visible: `1`
- status: `1`
- perms: `product:list`
- icon: `ShoppingBag`

#### 8. 商品规格 (menuId: 302)
- menuName: `商品规格`
- parentId: `300`
- orderNum: `2`
- path: `spec`
- component: `/product/product-spec`
- menuType: `C`
- visible: `1`
- status: `1`
- perms: `product:spec:list`
- icon: `SetUp`

#### 9. 商品评论 (menuId: 303)
- menuName: `商品评论`
- parentId: `300`
- orderNum: `3`
- path: `reply`
- component: `/product/product-reply`
- menuType: `C`
- visible: `1`
- status: `1`
- perms: `product:reply:list`
- icon: `ChatDotRound`

### 订单管理模块

#### 10. 订单管理 (menuId: 400)
- menuName: `订单管理`
- parentId: `0`
- orderNum: `4`
- path: `/order`
- component: `/order/index`
- menuType: `C`
- visible: `1`
- status: `1`
- perms: `order:list`
- icon: `ShoppingCart`

## 方法二：执行 SQL 文件

如果您可以直接访问 MySQL 数据库，可以执行以下 SQL：

```sql
-- 参考 apps/server/add-ecommerce-menus.sql
```

或者使用命令：

```bash
# 假设数据库名为 admin_system
mysql -u root -p admin_system < apps/server/add-ecommerce-menus.sql
```

## 方法三：使用脚本添加

```bash
cd apps/server
npx ts-node prisma/add-ecommerce-menus.ts
```

## 分配菜单权限给管理员

添加菜单后，需要在 `sys_role_menu` 表中为管理员角色（roleId=1）分配这些菜单的权限：

```sql
INSERT INTO sys_role_menu (role_id, menu_id, create_time, update_time)
VALUES 
  (1, 200, NOW(), NOW()),
  (1, 201, NOW(), NOW()),
  (1, 202, NOW(), NOW()),
  (1, 203, NOW(), NOW()),
  (1, 204, NOW(), NOW()),
  (1, 300, NOW(), NOW()),
  (1, 301, NOW(), NOW()),
  (1, 302, NOW(), NOW()),
  (1, 303, NOW(), NOW()),
  (1, 400, NOW(), NOW());
```

## 验证菜单添加成功

1. 重启后端服务
2. 重新登录前端系统
3. 应该能看到新的菜单项：
   - App用户（包含4个子菜单）
   - 商品管理（包含3个子菜单）
   - 订单管理

## 菜单说明

| 菜单ID | 菜单名称 | 路由路径 | 组件路径 | 图标 |
|--------|---------|----------|----------|------|
| 200 | App用户（目录） | /app-user | - | User |
| 201 | 用户管理 | /app-user/index | /app-user/index | User |
| 202 | 用户标签 | /app-user/tag | /app-user/user-tag | PriceTag |
| 203 | 用户等级 | /app-user/level | /app-user/user-level | Star |
| 204 | 用户分组 | /app-user/group | /app-user/user-group | Grid |
| 300 | 商品管理（目录） | /product | - | Goods |
| 301 | 商品列表 | /product/index | /product/index | ShoppingBag |
| 302 | 商品规格 | /product/spec | /product/product-spec | SetUp |
| 303 | 商品评论 | /product/reply | /product/product-reply | ChatDotRound |
| 400 | 订单管理 | /order | /order/index | ShoppingCart |

## 注意事项

1. menuType 字段说明：
   - `M` = 目录（Directory）
   - `C` = 菜单（Menu）
   - `F` = 按钮（Button）

2. visible 字段：
   - `1` = 显示
   - `0` = 隐藏

3. status 字段：
   - `1` = 正常
   - `0` = 停用

4. 前端页面文件必须存在于对应的路径，否则会显示 404


