# 用户个人中心功能

## 功能概述

用户个人中心提供了个人信息展示、个人资料修改和密码修改三大功能，采用左右布局设计，左侧展示个人信息，右侧通过 Tab 切换进行资料修改和密码修改操作。

## 功能特性

### 1. 个人信息展示
- 显示用户头像（支持默认昵称首字母头像）
- 展示用户基本信息：用户名、昵称、邮箱、手机号
- 显示用户状态（正常/禁用）
- 显示用户角色列表

### 2. 个人资料修改
- 修改昵称（必填）
- 修改邮箱（可选，需符合邮箱格式）
- 修改手机号（可选）
- 修改头像 URL（可选）
- 修改成功后自动刷新用户信息

### 3. 修改密码
- 需验证旧密码
- 新密码长度至少 6 位
- 确认密码需与新密码一致
- 修改成功后会使旧 token 失效（通过更新 `passwordChangedAt` 字段实现）
- **修改成功后强制重新登录**：显示提示对话框，点击确定后清除用户状态并跳转到登录页

## 技术实现

### 后端实现

#### DTO 定义
**文件位置**: `apps/server/src/modules/user/dto/user.dto.ts`

```typescript
// 更新个人资料 DTO
export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

// 修改密码 DTO
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
```

#### Controller 接口
**文件位置**: `apps/server/src/modules/user/user.controller.ts`

```typescript
// 更新个人资料
@Put('profile')
updateProfile(@CurrentUser() user: JwtPayload, @Body() updateProfileDto: UpdateProfileDto)

// 修改密码
@Put('password')
changePassword(@CurrentUser() user: JwtPayload, @Body() changePasswordDto: ChangePasswordDto)
```

#### Service 业务逻辑
**文件位置**: `apps/server/src/modules/user/user.service.ts`

- `updateProfile()`: 更新用户个人资料
- `changePassword()`: 验证旧密码、加密新密码、更新密码并记录修改时间

### 前端实现

#### 类型定义
**文件位置**: `packages/shared/src/types/user.ts`

```typescript
// 个人资料表单
export interface ProfileForm {
  nickname: string
  email?: string
  phone?: string
  avatar?: string
}

// 修改密码表单
export interface ChangePasswordForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
```

#### API 接口
**文件位置**: `apps/admin/src/api/user.ts`

```typescript
// 更新个人资料
export function updateProfile(data: ProfileForm): Promise<User>

// 修改密码
export function changePassword(data: ChangePasswordForm): Promise<void>
```

#### 视图组件

**主视图**: `apps/admin/src/views/user/index.vue`
- 采用 `el-row` 和 `el-col` 实现左右布局
- 左侧（8栏）展示个人信息
- 右侧（16栏）使用 `el-tabs` 进行 Tab 切换

**子组件**:
1. `components/ProfileInfo.vue` - 个人信息展示组件（只读）
2. `components/ProfileEdit.vue` - 个人资料修改表单（使用 useForm）
3. `components/PasswordChange.vue` - 修改密码表单（使用 useForm）

#### 路由配置
**文件位置**: `apps/admin/src/router/routes.ts`

```typescript
{
  path: '/user',
  component: () => import('@/layouts/Layout.vue'),
  meta: {
    hidden: true  // 不在菜单中显示
  },
  children: [
    {
      path: 'profile',
      name: 'UserProfile',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '个人中心',
        hidden: true
      }
    }
  ]
}
```

## API 端点

### 更新个人资料
- **URL**: `PUT /user/profile`
- **权限**: 需登录
- **请求体**:
  ```json
  {
    "nickname": "string",
    "email": "string (optional)",
    "phone": "string (optional)",
    "avatar": "string (optional)"
  }
  ```
- **响应**: 返回更新后的用户信息

### 修改密码
- **URL**: `PUT /user/password`
- **权限**: 需登录
- **请求体**:
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
- **响应**: 无响应内容，成功返回 200

## 使用说明

### 访问个人中心
直接访问路由 `/user/profile` 即可进入个人中心页面。

### 修改个人资料
1. 在右侧 Tab 中选择"修改资料"
2. 填写需要修改的信息（昵称为必填项）
3. 点击"保存修改"按钮
4. 修改成功后会自动刷新显示最新信息

### 修改密码
1. 在右侧 Tab 中选择"修改密码"
2. 输入旧密码
3. 输入新密码（至少 6 位）
4. 确认新密码（需与新密码一致）
5. 点击"修改密码"按钮
6. 修改成功后表单会自动重置

## 安全特性

1. **密码验证**: 修改密码时必须验证旧密码
2. **密码加密**: 使用 bcrypt 对密码进行加密存储
3. **Token 失效**: 修改密码后，通过更新 `passwordChangedAt` 字段使旧 token 失效
4. **权限控制**: 只能修改当前登录用户的信息（通过 `@CurrentUser()` 装饰器获取当前用户）

## 界面布局

```
┌─────────────────────────────────────────────────────┐
│                    个人中心页面                      │
├─────────────────┬───────────────────────────────────┤
│   个人信息      │        Tab 切换区域                │
│                 │  ┌─────────────────────────────┐  │
│   ┌────────┐   │  │  修改资料  │  修改密码       │  │
│   │ 头像   │   │  ├─────────────────────────────┤  │
│   └────────┘   │  │                             │  │
│                 │  │   表单内容                   │  │
│   用户信息      │  │                             │  │
│   - 用户名      │  │                             │  │
│   - 昵称        │  │   [保存修改] [重置]          │  │
│   - 邮箱        │  │                             │  │
│   - 手机号      │  │                             │  │
│   - 状态        │  │                             │  │
│   - 角色        │  │                             │  │
└─────────────────┴───────────────────────────────────┘
```

## 相关文件清单

### 后端文件
- `apps/server/src/modules/user/dto/user.dto.ts` - DTO 定义
- `apps/server/src/modules/user/user.controller.ts` - Controller 层
- `apps/server/src/modules/user/user.service.ts` - Service 层

### 前端文件
- `packages/shared/src/types/user.ts` - TypeScript 类型定义
- `apps/admin/src/api/user.ts` - API 接口封装
- `apps/admin/src/views/user/index.vue` - 主视图
- `apps/admin/src/views/user/components/ProfileInfo.vue` - 信息展示组件
- `apps/admin/src/views/user/components/ProfileEdit.vue` - 资料修改组件
- `apps/admin/src/views/user/components/PasswordChange.vue` - 密码修改组件
- `apps/admin/src/router/routes.ts` - 路由配置
- `apps/admin/src/mocks/handlers/user.ts` - Mock 数据处理器（开发环境）

## 注意事项

1. 修改密码后会导致当前 token 失效，需要重新登录（如果有 JWT 验证 `passwordChangedAt` 的逻辑）
2. 邮箱格式会在前端和后端都进行验证
3. 密码长度限制为至少 6 位
4. 头像目前使用 URL 方式，如需上传功能需额外实现
5. 个人中心路由设置为 `hidden: true`，不会在侧边栏菜单中显示

## 问题修复记录

### 1. useForm 方法名称修正
- **问题**: 组件中使用了 `resetFields()` 方法，但 useForm 返回的是 `reset()` 方法
- **修复**: 将所有 `resetFields()` 调用改为 `reset()`

### 2. 表单验证规则配置
- **问题**: 在 useForm 的选项中传入 `rules`，但该选项不支持
- **修复**: 将验证规则直接通过 `:rules` 属性传递给 `k-input` 组件

### 3. Mock 数据处理器
- **问题**: 缺少个人中心相关的 mock handlers
- **修复**: 在 `apps/admin/src/mocks/handlers/user.ts` 中添加：
  - `PUT /user/profile` - 更新个人资料
  - `PUT /user/password` - 修改密码

