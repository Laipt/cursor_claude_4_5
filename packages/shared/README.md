# @admin-system/shared

统一的类型定义和常量，用于前后端共享。

## 功能特性

- ✅ 统一的 TypeScript 类型定义
- ✅ 统一的字典常量值
- ✅ 同时支持 CommonJS 和 ES Module
- ✅ 工具函数辅助

## 安装

```bash
# 在前端或后端项目中引用
pnpm add @admin-system/shared@workspace:*
```

## 使用示例

### 1. 状态常量

```typescript
import { Status, StatusLabel, getStatusLabel, getStatusTagType } from '@admin-system/shared'

// 使用常量
const userStatus = Status.NORMAL  // 1
const disabledStatus = Status.DISABLED  // 0

// 获取状态标签
const label = getStatusLabel(userStatus)  // "正常"

// 获取Element Plus标签类型
const tagType = getStatusTagType(userStatus)  // "success"

// 使用标签映射
console.log(StatusLabel[Status.NORMAL])  // "正常"
```

### 2. 菜单类型常量

```typescript
import { MenuTypeValue, MenuTypeLabel, getMenuTypeLabel } from '@admin-system/shared'

// 菜单类型
const menuType = MenuTypeValue.MENU  // "C"
const directoryType = MenuTypeValue.DIRECTORY  // "M"
const buttonType = MenuTypeValue.BUTTON  // "F"

// 获取类型标签
const label = getMenuTypeLabel(MenuTypeValue.MENU)  // "菜单"
```

### 3. 可见性常量

```typescript
import { Visible, VisibleLabel, isVisible } from '@admin-system/shared'

// 使用常量
const visibility = Visible.VISIBLE  // 1
const hidden = Visible.HIDDEN  // 0

// 检查是否可见
if (isVisible(menu.visible)) {
  // 显示菜单
}
```

### 4. 在 Vue 组件中使用

```vue
<template>
  <el-tag :type="getStatusTagType(user.status)">
    {{ getStatusLabel(user.status) }}
  </el-tag>
</template>

<script setup lang="ts">
import { User, Status, getStatusLabel, getStatusTagType } from '@admin-system/shared'

const user: User = {
  userId: 1,
  username: 'admin',
  status: Status.NORMAL,
  // ...
}
</script>
```

### 5. 在 NestJS 中使用

```typescript
import { Injectable } from '@nestjs/common'
import { Status, MenuTypeValue } from '@admin-system/shared'

@Injectable()
export class UserService {
  async getActiveUsers() {
    return this.prisma.user.findMany({
      where: { status: Status.NORMAL }
    })
  }
}
```

## 可用常量

### Status - 通用状态
- `Status.DISABLED` (0) - 禁用
- `Status.NORMAL` (1) - 正常

### MenuTypeValue - 菜单类型
- `MenuTypeValue.DIRECTORY` ("M") - 目录
- `MenuTypeValue.MENU` ("C") - 菜单
- `MenuTypeValue.BUTTON` ("F") - 按钮

### Visible - 可见性
- `Visible.HIDDEN` (0) - 隐藏
- `Visible.VISIBLE` (1) - 显示

### IsDefault - 是否默认
- `IsDefault.NO` (0) - 否
- `IsDefault.YES` (1) - 是

### ConfigType - 配置类型
- `ConfigType.SYSTEM` ("system") - 系统配置
- `ConfigType.BUSINESS` ("business") - 业务配置

### DictTypes - 字典类型
- `DictTypes.USER_STATUS` - 用户状态
- `DictTypes.MENU_STATUS` - 菜单状态
- `DictTypes.ROLE_STATUS` - 角色状态
- `DictTypes.DICT_STATUS` - 字典状态
- `DictTypes.MENU_TYPE` - 菜单类型
- `DictTypes.SHOW_HIDE` - 是否显示
- `DictTypes.YES_NO` - 是否

### HttpStatus - HTTP 状态码
- `HttpStatus.OK` (200)
- `HttpStatus.CREATED` (201)
- `HttpStatus.NO_CONTENT` (204)
- `HttpStatus.BAD_REQUEST` (400)
- `HttpStatus.UNAUTHORIZED` (401)
- `HttpStatus.FORBIDDEN` (403)
- `HttpStatus.NOT_FOUND` (404)
- `HttpStatus.INTERNAL_SERVER_ERROR` (500)

## 工具函数

- `isNormalStatus(status: number): boolean` - 检查状态是否正常
- `isVisible(visible: number): boolean` - 检查是否可见
- `getStatusLabel(status: number): string` - 获取状态标签
- `getStatusTagType(status: number): string` - 获取状态标签类型
- `getMenuTypeLabel(menuType: string): string` - 获取菜单类型标签
- `getVisibleLabel(visible: number): string` - 获取可见性标签

## 类型定义

所有实体的 TypeScript 类型定义：

- `User` - 用户
- `Role` - 角色
- `Menu` - 菜单
- `Dict` - 字典
- `DictData` - 字典数据
- `Config` - 配置
- `PageResult<T>` - 分页结果
- `PageQuery` - 分页查询参数

## 开发

```bash
# 开发模式（监听文件变化）
pnpm dev

# 构建
pnpm build

# 仅构建 CommonJS
pnpm build:cjs

# 仅构建 ES Module
pnpm build:esm
```

## 优势

1. **类型安全**：避免魔法数字和硬编码字符串
2. **易于维护**：统一管理，修改一处即可
3. **自动补全**：IDE 提供完整的类型提示
4. **前后端一致**：保证前后端使用相同的值
5. **语义清晰**：常量名称具有明确的含义

## 最佳实践

1. **始终使用常量**：避免直接使用数字或字符串
   ```typescript
   // ❌ 不好
   if (user.status === 1) { }
   
   // ✅ 好
   if (user.status === Status.NORMAL) { }
   ```

2. **使用工具函数**：简化常见操作
   ```typescript
   // ❌ 不好
   const label = user.status === 1 ? '正常' : '禁用'
   
   // ✅ 好
   const label = getStatusLabel(user.status)
   ```

3. **类型导入**：同时导入类型和常量
   ```typescript
   import { User, Status } from '@admin-system/shared'
   ```

## 许可证

MIT

