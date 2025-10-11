# Shared包集成说明

本文档说明如何将 `@kk/shared` 包应用到前后端项目中，统一字典值和类型定义。

## 📋 已完成的工作

### 1. Shared包更新

- ✅ 创建了 `packages/shared/src/constants.ts` 文件
- ✅ 定义了所有字典常量（状态、菜单类型、可见性等）
- ✅ 添加了工具函数（getStatusLabel、getStatusTagType等）
- ✅ 配置了双模块系统（CommonJS + ES Module）
- ✅ 更新了package.json支持module exports

### 2. 前端集成

#### 已更新的文件

**配置文件**
- `apps/admin/package.json` - 添加了shared包依赖

**组件文件**
- `apps/admin/src/layouts/MenuItem.vue` - 使用 MenuTypeValue、Visible 常量
- `apps/admin/src/stores/permission.ts` - 使用 MenuTypeValue、Visible 常量

**页面文件**
- `apps/admin/src/views/home/index.vue` - 使用状态工具函数
- `apps/admin/src/views/system/user/index.vue` - 使用 Status、StatusLabel 和工具函数
- `apps/admin/src/views/system/role/index.vue` - 使用状态工具函数
- `apps/admin/src/views/system/menu/index.vue` - 使用 MenuTypeValue、Status、Visible 和工具函数

### 3. 后端集成

#### 已更新的文件

**认证相关**
- `apps/server/src/auth/auth.service.ts` - 使用 Status 常量
- `apps/server/src/auth/guards/permissions.guard.ts` - 使用 Status 常量

**服务文件**
- `apps/server/src/modules/menu/menu.service.ts` - 使用 Status 常量
- `apps/server/src/modules/role/role.service.ts` - 使用 Status 常量

**数据初始化**
- `apps/server/prisma/seed.ts` - 使用所有常量（Status、Visible、MenuTypeValue、IsDefault）

## 🎯 主要改进

### 1. 类型安全

**之前：**
```typescript
// 硬编码的魔法数字
if (user.status === 1) { }
if (menu.visible === 0) { }
if (menu.menuType === 'C') { }
```

**现在：**
```typescript
// 语义清晰的常量
import { Status, Visible, MenuTypeValue } from '@kk/shared'

if (user.status === Status.NORMAL) { }
if (menu.visible === Visible.HIDDEN) { }
if (menu.menuType === MenuTypeValue.MENU) { }
```

### 2. 统一的标签显示

**之前：**
```vue
<el-tag :type="row.status === 1 ? 'success' : 'danger'">
  {{ row.status === 1 ? '正常' : '禁用' }}
</el-tag>
```

**现在：**
```vue
<el-tag :type="getStatusTagType(row.status)">
  {{ getStatusLabel(row.status) }}
</el-tag>
```

### 3. 前后端值统一

所有的字典值在前后端保持完全一致：

| 常量类别 | 前端使用 | 后端使用 | 数据库值 |
|---------|---------|---------|---------|
| 用户状态 | ✅ | ✅ | ✅ |
| 菜单类型 | ✅ | ✅ | ✅ |
| 可见性 | ✅ | ✅ | ✅ |
| 角色状态 | ✅ | ✅ | ✅ |

## 📦 可用的常量

### 状态相关
```typescript
Status.NORMAL      // 1 - 正常
Status.DISABLED    // 0 - 禁用

StatusLabel[Status.NORMAL]     // "正常"
StatusTagType[Status.NORMAL]   // "success"
```

### 菜单相关
```typescript
MenuTypeValue.DIRECTORY  // "M" - 目录
MenuTypeValue.MENU       // "C" - 菜单
MenuTypeValue.BUTTON     // "F" - 按钮

Visible.VISIBLE  // 1 - 显示
Visible.HIDDEN   // 0 - 隐藏
```

### 工具函数
```typescript
getStatusLabel(status)      // 获取状态文本
getStatusTagType(status)    // 获取标签类型
getMenuTypeLabel(menuType)  // 获取菜单类型文本
isNormalStatus(status)      // 检查是否正常状态
isVisible(visible)          // 检查是否可见
```

## 🚀 使用示例

### Vue组件中使用

```vue
<template>
  <el-form-item label="状态">
    <el-select v-model="formData.status">
      <el-option 
        :label="StatusLabel[Status.NORMAL]" 
        :value="Status.NORMAL" 
      />
      <el-option 
        :label="StatusLabel[Status.DISABLED]" 
        :value="Status.DISABLED" 
      />
    </el-select>
  </el-form-item>
  
  <el-table-column prop="status" label="状态">
    <template #default="{ row }">
      <el-tag :type="getStatusTagType(row.status)">
        {{ getStatusLabel(row.status) }}
      </el-tag>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { 
  Status, 
  StatusLabel, 
  getStatusLabel, 
  getStatusTagType 
} from '@kk/shared'
</script>
```

### NestJS服务中使用

```typescript
import { Injectable } from '@nestjs/common'
import { Status, MenuTypeValue } from '@kk/shared'

@Injectable()
export class MenuService {
  async getActiveMenus() {
    return this.prisma.menu.findMany({
      where: { 
        status: Status.NORMAL,
        menuType: MenuTypeValue.MENU
      }
    })
  }
}
```

### 数据库种子文件

```typescript
import { Status, Visible, MenuTypeValue } from '@kk/shared'

const menus = [
  {
    menuName: '首页',
    menuType: MenuTypeValue.MENU,
    visible: Visible.VISIBLE,
    status: Status.NORMAL,
  }
]
```

## 🔄 构建流程

Shared包现在支持双模块系统：

```bash
cd packages/shared
pnpm build

# 生成文件：
# - dist/index.js (CommonJS) - 供后端使用
# - dist/index.mjs (ES Module) - 供前端使用
# - dist/index.d.ts (类型定义) - 供TypeScript使用
```

package.json 配置：
```json
{
  "main": "dist/index.js",      // CommonJS入口
  "module": "dist/index.mjs",   // ES Module入口
  "types": "dist/index.d.ts",   // 类型定义
  "exports": {
    ".": {
      "import": "./dist/index.mjs",   // import时使用
      "require": "./dist/index.js",   // require时使用
      "types": "./dist/index.d.ts"
    }
  }
}
```

## 📝 迁移指南

如果要在现有项目中迁移：

### 1. 安装依赖
```bash
pnpm add @kk/shared@workspace:*
```

### 2. 查找硬编码值
```bash
# 查找状态相关的硬编码
grep -r "status.*==.*[01]" src/
grep -r "visible.*==.*[01]" src/
grep -r "menuType.*==.*'[MCF]'" src/
```

### 3. 替换为常量
```typescript
// 之前
if (user.status === 1)
// 之后
import { Status } from '@kk/shared'
if (user.status === Status.NORMAL)
```

### 4. 更新显示逻辑
```typescript
// 之前
{{ row.status === 1 ? '正常' : '禁用' }}

// 之后
import { getStatusLabel } from '@kk/shared'
{{ getStatusLabel(row.status) }}
```

## ✅ 优势总结

1. **类型安全**：TypeScript编译时检查，避免使用错误的值
2. **易于维护**：修改常量值只需在一处修改
3. **代码可读性**：`Status.NORMAL` 比 `1` 更容易理解
4. **前后端一致性**：确保前后端使用相同的值
5. **自动补全**：IDE提供智能提示
6. **减少错误**：避免拼写错误和魔法数字
7. **文档化**：常量本身就是文档

## 📚 相关文档

- [Shared包详细文档](./packages/shared/README.md)
- [TypeScript类型定义](./packages/shared/src/types/)
- [常量定义](./packages/shared/src/constants.ts)

## 🔍 注意事项

1. **构建顺序**：修改shared包后，需要先构建shared包，再构建前后端
   ```bash
   cd packages/shared && pnpm build
   cd ../../ && pnpm build:admin
   cd ../../ && pnpm build:server
   ```

2. **热更新**：开发模式下，可以启动shared包的watch模式
   ```bash
   cd packages/shared && pnpm dev
   ```

3. **版本管理**：使用workspace协议确保前后端使用同一版本
   ```json
   "@kk/shared": "workspace:*"
   ```

## 🎉 完成状态

- [x] 创建constants.ts文件
- [x] 定义所有字典常量
- [x] 添加工具函数
- [x] 配置双模块系统
- [x] 前端集成
- [x] 后端集成
- [x] 数据库种子文件更新
- [x] 文档编写
- [x] 构建测试通过

## 💡 未来扩展

可以考虑在shared包中添加：

- [ ] 表单验证规则
- [ ] API接口路径常量
- [ ] 错误代码常量
- [ ] 正则表达式常量
- [ ] 日期格式常量
- [ ] 权限标识常量

