# 数据库初始化说明

## 🎯 初始化命令

### 完整初始化流程

```bash
# 1. 进入后端目录
cd apps/server

# 2. 生成 Prisma Client
pnpm prisma:generate

# 3. 运行数据库迁移
pnpm prisma:migrate

# 4. 初始化种子数据（包括字典数据）
pnpm prisma:seed
```

### 快速初始化（推荐）

```bash
cd apps/server
pnpm prisma:seed
```

如果数据库已存在数据，种子脚本会先清空所有表，然后重新初始化。

## 📊 初始化的数据

### 1. 菜单数据（27条）

初始化了完整的后台管理菜单结构：

- 首页
- 系统管理（目录）
  - 用户管理
  - 角色管理
  - 菜单管理
  - 字典管理
  - 参数设置

每个菜单都包含相应的按钮权限（查询、新增、编辑、删除等）。

### 2. 角色数据（1个）

**管理员角色**
- roleName: 管理员
- roleKey: admin
- status: 1（正常）
- 拥有所有菜单权限

### 3. 用户数据（1个）

**管理员用户**
- username: `admin`
- password: `admin123`
- nickname: 管理员
- email: admin@example.com
- phone: 13800138000
- status: 1（正常）
- 分配了管理员角色

### 4. 字典类型数据（7种）

| dictId | dictName | dictType | remark |
|--------|----------|----------|--------|
| 1 | 用户状态 | sys_user_status | 用户状态列表 |
| 2 | 角色状态 | sys_role_status | 角色状态列表 |
| 3 | 菜单状态 | sys_menu_status | 菜单状态列表 |
| 4 | 菜单类型 | sys_menu_type | 菜单类型列表 |
| 5 | 菜单可见性 | sys_menu_visible | 菜单显示隐藏 |
| 6 | 字典状态 | sys_dict_status | 字典状态列表 |
| 7 | 是否 | sys_yes_no | 系统是否 |

### 5. 字典数据（详细）

#### 用户状态 (sys_user_status)

| dictLabel | dictValue | listClass | dictSort | remark |
|-----------|-----------|-----------|----------|--------|
| 正常 | 1 | success | 1 | 正常状态 |
| 禁用 | 0 | danger | 2 | 禁用状态 |

#### 角色状态 (sys_role_status)

| dictLabel | dictValue | listClass | dictSort | remark |
|-----------|-----------|-----------|----------|--------|
| 正常 | 1 | success | 1 | 正常状态 |
| 禁用 | 0 | danger | 2 | 禁用状态 |

#### 菜单状态 (sys_menu_status)

| dictLabel | dictValue | listClass | dictSort | remark |
|-----------|-----------|-----------|----------|--------|
| 正常 | 1 | success | 1 | 正常状态 |
| 停用 | 0 | danger | 2 | 停用状态 |

#### 菜单类型 (sys_menu_type)

| dictLabel | dictValue | listClass | dictSort | remark |
|-----------|-----------|-----------|----------|--------|
| 目录 | M | warning | 1 | 目录 |
| 菜单 | C | primary | 2 | 菜单 |
| 按钮 | F | info | 3 | 按钮 |

#### 菜单可见性 (sys_menu_visible)

| dictLabel | dictValue | listClass | dictSort | remark |
|-----------|-----------|-----------|----------|--------|
| 显示 | 1 | success | 1 | 显示 |
| 隐藏 | 0 | info | 2 | 隐藏 |

#### 字典状态 (sys_dict_status)

| dictLabel | dictValue | listClass | dictSort | remark |
|-----------|-----------|-----------|----------|--------|
| 正常 | 1 | success | 1 | 正常状态 |
| 停用 | 0 | danger | 2 | 停用状态 |

#### 是否 (sys_yes_no)

| dictLabel | dictValue | listClass | dictSort | remark |
|-----------|-----------|-----------|----------|--------|
| 是 | 1 | success | 1 | 是 |
| 否 | 0 | info | 2 | 否 |

### 6. 配置数据（2条）

| configName | configKey | configValue | configType |
|-----------|-----------|-------------|------------|
| 系统名称 | sys.name | Admin System | system |
| 系统版本 | sys.version | 1.0.0 | system |

## 🔍 字典数据字段说明

### DictData 字段

```typescript
{
  dictCode: number        // 字典编码（主键）
  dictSort: number        // 排序
  dictLabel: string       // 字典标签（显示值）
  dictValue: string       // 字典值（实际值）
  dictType: string        // 字典类型
  cssClass: string        // CSS类名
  listClass: string       // 列表样式类（用于Element Plus标签类型）
  isDefault: number       // 是否默认（0否 1是）
  status: number          // 状态（0禁用 1正常）
  remark: string          // 备注
  createTime: string      // 创建时间
  updateTime: string      // 更新时间
}
```

### listClass 说明

`listClass` 字段用于 Element Plus 的 `el-tag` 组件的 `type` 属性：

- `success` - 绿色标签（表示正常、成功、是等）
- `danger` - 红色标签（表示禁用、错误、否等）
- `warning` - 橙色标签（表示警告）
- `primary` - 蓝色标签（表示主要）
- `info` - 灰色标签（表示信息）

## 📝 使用示例

### 后端查询字典数据

```typescript
// 获取用户状态字典
const statusDict = await prisma.dictData.findMany({
  where: {
    dictType: 'sys_user_status',
    status: 1, // 只查询正常状态的
  },
  orderBy: { dictSort: 'asc' }
});
```

### 前端使用字典

```vue
<script setup lang="ts">
import { DictTypes } from '@admin-system/shared'
import { useDict } from '@/composables/useDict'

// 使用用户状态字典
const statusDict = useDict(DictTypes.USER_STATUS)
</script>

<template>
  <!-- 下拉选择 -->
  <el-select v-model="form.status">
    <el-option 
      v-for="item in statusDict.options.value"
      :key="item.value"
      :label="item.label" 
      :value="Number(item.value)" 
    />
  </el-select>
  
  <!-- 状态标签 -->
  <el-tag :type="statusDict.getTagType(user.status)">
    {{ statusDict.getLabel(user.status) }}
  </el-tag>
</template>
```

## 🔧 添加新字典

### 方法一：直接在数据库中添加

```sql
-- 1. 添加字典类型
INSERT INTO dict (dictName, dictType, status, remark)
VALUES ('性别', 'sys_user_sex', 1, '用户性别');

-- 2. 添加字典数据
INSERT INTO dict_data 
  (dictSort, dictLabel, dictValue, dictType, cssClass, listClass, isDefault, status, remark)
VALUES 
  (1, '男', '1', 'sys_user_sex', '', 'primary', 0, 1, '男'),
  (2, '女', '2', 'sys_user_sex', '', 'danger', 0, 1, '女'),
  (3, '未知', '0', 'sys_user_sex', '', 'info', 1, 1, '未知');
```

### 方法二：修改 seed.ts

在 `apps/server/prisma/seed.ts` 中添加：

```typescript
// 创建字典类型
await prisma.dict.createMany({
  data: [
    // ... 现有字典类型
    {
      dictName: '性别',
      dictType: 'sys_user_sex',
      status: Status.NORMAL,
      remark: '用户性别',
    },
  ],
});

// 创建字典数据
await prisma.dictData.createMany({
  data: [
    // ... 现有字典数据
    {
      dictSort: 1,
      dictLabel: '男',
      dictValue: '1',
      dictType: 'sys_user_sex',
      cssClass: '',
      listClass: 'primary',
      isDefault: IsDefault.NO,
      status: Status.NORMAL,
      remark: '男',
    },
    // ...
  ],
});
```

然后重新运行：
```bash
pnpm prisma:seed
```

### 方法三：通过后台界面添加

1. 登录系统
2. 进入 "系统管理" -> "字典管理"
3. 点击 "新增字典类型"
4. 添加字典数据

## ⚠️ 注意事项

### 1. 重置数据

运行 `pnpm prisma:seed` 会清空所有表并重新初始化：

```typescript
// seed.ts 中的清空操作
await prisma.userRole.deleteMany();
await prisma.roleMenu.deleteMany();
await prisma.user.deleteMany();
await prisma.role.deleteMany();
await prisma.menu.deleteMany();
await prisma.dict.deleteMany();
await prisma.dictData.deleteMany();
await prisma.config.deleteMany();
```

**生产环境请勿运行！**

### 2. 字典类型命名规范

- 使用小写字母和下划线
- 以 `sys_` 开头表示系统字典
- 格式：`sys_模块_字段名`
- 例如：`sys_user_status`、`sys_menu_type`

### 3. 字典值说明

- `dictValue` 存储实际值（字符串类型）
- `dictLabel` 存储显示值（中文标签）
- 前端使用时需要根据数据类型转换（如 `Number(item.value)`）

### 4. 状态控制

只有 `status = 1`（正常）的字典数据会被API返回给前端：

```typescript
// dict.service.ts
async getDictDataByType(dictType: string): Promise<DictData[]> {
  const dictDataList = await this.prisma.dictData.findMany({
    where: {
      dictType,
      status: Status.NORMAL, // 只返回正常状态
    },
    orderBy: { dictSort: 'asc' },
  });
  // ...
}
```

## 🔄 数据库管理命令

```bash
# 查看数据库状态
pnpm prisma:studio

# 生成 Prisma Client
pnpm prisma:generate

# 创建迁移
pnpm prisma:migrate

# 重置数据库（危险！会删除所有数据）
npx prisma migrate reset

# 运行种子数据
pnpm prisma:seed
```

## 📊 验证初始化结果

### 检查字典类型

```sql
SELECT * FROM dict;
```

应该返回 7 条记录。

### 检查字典数据

```sql
SELECT * FROM dict_data ORDER BY dictType, dictSort;
```

应该返回所有字典数据。

### 检查用户

```sql
SELECT * FROM user;
```

应该有一个 admin 用户。

## 🎉 初始化完成

运行成功后会看到：

```
Starting seed...
Menus created
Admin role created
Admin role assigned all menus
Admin user created
Admin user assigned admin role
Dict data created
Config data created
Seed completed successfully!
Admin user: username=admin, password=admin123
```

现在可以使用 `admin/admin123` 登录系统了！

