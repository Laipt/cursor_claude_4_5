# 字典API集成说明

本文档说明如何使用后端API获取字典数据，并实现前端字典缓存机制。

## 🎯 核心改进

### 之前的方案（已废弃）
- ❌ 在 shared 包中硬编码 Label 映射
- ❌ 前端直接使用硬编码的标签
- ❌ 修改标签需要重新编译前后端

### 现在的方案（推荐）
- ✅ 字典数据存储在数据库中
- ✅ 后端提供 API 接口返回字典数据
- ✅ 前端使用 store 缓存字典数据
- ✅ 修改字典只需在数据库中更新
- ✅ 已获取的字典自动缓存，不重复请求

## 📦 架构设计

```
┌─────────────────┐
│   数据库字典表   │ ← 存储所有字典数据
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  后端API接口     │ ← 提供字典查询接口
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  前端DictStore  │ ← 缓存字典数据
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  useDict Hook   │ ← 简化字典使用
└─────────────────┘
```

## 🔧 实现细节

### 1. Shared包（只保留常量值）

**packages/shared/src/constants.ts**
```typescript
// 只定义常量值，不定义Label映射
export const Status = {
  DISABLED: 0,
  NORMAL: 1,
} as const

export const MenuTypeValue = {
  DIRECTORY: 'M',
  MENU: 'C',
  BUTTON: 'F',
} as const

// 字典类型常量
export const DictTypes = {
  USER_STATUS: 'sys_user_status',
  MENU_STATUS: 'sys_menu_status',
  ROLE_STATUS: 'sys_role_status',
  MENU_TYPE: 'sys_menu_type',
  MENU_VISIBLE: 'sys_menu_visible',
  // ...
} as const
```

### 2. 后端API接口

**apps/server/src/modules/dict/dict.controller.ts**
```typescript
// 根据字典类型获取字典数据（公开接口）
@Get('data/type/:dictType')
getDictDataByType(@Param('dictType') dictType: string) {
  return this.dictService.getDictDataByType(dictType);
}
```

**apps/server/src/modules/dict/dict.service.ts**
```typescript
async getDictDataByType(dictType: string): Promise<DictData[]> {
  const dictDataList = await this.prisma.dictData.findMany({
    where: {
      dictType,
      status: Status.NORMAL, // 只返回正常状态的数据
    },
    orderBy: { dictSort: 'asc' },
  });
  
  return dictDataList.map(data => ({
    dictCode: data.dictCode,
    dictLabel: data.dictLabel,
    dictValue: data.dictValue,
    listClass: data.listClass, // 用于Element Plus标签类型
    // ...
  }));
}
```

### 3. 前端字典Store

**apps/admin/src/stores/dict.ts**
```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DictData } from '@kk/shared'
import { getDictDataByType } from '@/api/dict'

export const useDictStore = defineStore('dict', () => {
  // 字典数据缓存
  const dictCache = ref<Map<string, DictData[]>>(new Map())
  
  /**
   * 获取字典数据（自动缓存）
   */
  async function getDictData(dictType: string, forceRefresh = false) {
    // 如果有缓存且不强制刷新，直接返回
    if (!forceRefresh && dictCache.value.has(dictType)) {
      return dictCache.value.get(dictType)!
    }
    
    // 从API获取
    const data = await getDictDataByType(dictType)
    dictCache.value.set(dictType, data)
    return data
  }
  
  /**
   * 获取字典标签
   */
  async function getDictLabel(dictType: string, dictValue: string | number) {
    const data = await getDictData(dictType)
    const item = data.find(d => d.dictValue === String(dictValue))
    return item?.dictLabel || String(dictValue)
  }
  
  /**
   * 获取标签类型（Element Plus）
   */
  async function getDictTagType(dictType: string, dictValue: string | number) {
    const data = await getDictData(dictType)
    const item = data.find(d => d.dictValue === String(dictValue))
    return item?.listClass || 'info'
  }
  
  return {
    getDictData,
    getDictLabel,
    getDictTagType,
    // ...
  }
})
```

### 4. 前端使用Composable

**apps/admin/src/composables/useDict.ts**
```typescript
import { ref, computed } from 'vue'
import { useDictStore } from '@/stores/dict'
import type { DictData } from '@kk/shared'

/**
 * 使用字典
 */
export function useDict(dictType: string) {
  const dictStore = useDictStore()
  const dictData = ref<DictData[]>([])
  
  // 加载字典数据
  const loadDict = async () => {
    dictData.value = await dictStore.getDictData(dictType)
  }
  
  // 立即加载
  loadDict()
  
  // 获取标签
  const getLabel = (value: string | number) => {
    const item = dictData.value.find(d => d.dictValue === String(value))
    return item?.dictLabel || String(value)
  }
  
  // 获取标签类型
  const getTagType = (value: string | number) => {
    const item = dictData.value.find(d => d.dictValue === String(value))
    return item?.listClass || 'info'
  }
  
  // 选项列表（用于下拉框）
  const options = computed(() => {
    return dictData.value.map(d => ({
      label: d.dictLabel,
      value: d.dictValue,
    }))
  })
  
  return {
    dictData,
    getLabel,
    getTagType,
    options
  }
}
```

### 5. 在Vue组件中使用

**示例：用户管理页面**

```vue
<template>
  <!-- 下拉选择 -->
  <el-select v-model="queryParams.status">
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
  
  <!-- 单选框 -->
  <el-radio-group v-model="formData.status">
    <el-radio 
      v-for="item in statusDict.options.value"
      :key="item.value"
      :value="Number(item.value)"
    >
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { DictTypes } from '@kk/shared'
import { useDict } from '@/composables/useDict'

// 使用字典
const statusDict = useDict(DictTypes.USER_STATUS)
</script>
```

## 📊 数据库字典数据

### 字典类型表（dict）

| dictId | dictName | dictType | status | remark |
|--------|----------|----------|--------|--------|
| 1 | 用户状态 | sys_user_status | 1 | 用户状态列表 |
| 2 | 角色状态 | sys_role_status | 1 | 角色状态列表 |
| 3 | 菜单状态 | sys_menu_status | 1 | 菜单状态列表 |
| 4 | 菜单类型 | sys_menu_type | 1 | 菜单类型列表 |
| 5 | 菜单可见性 | sys_menu_visible | 1 | 菜单显示隐藏 |

### 字典数据表（dict_data）

**用户状态 (sys_user_status)**
| dictLabel | dictValue | listClass | dictSort |
|-----------|-----------|-----------|----------|
| 正常 | 1 | success | 1 |
| 禁用 | 0 | danger | 2 |

**菜单类型 (sys_menu_type)**
| dictLabel | dictValue | listClass | dictSort |
|-----------|-----------|-----------|----------|
| 目录 | M | warning | 1 |
| 菜单 | C | primary | 2 |
| 按钮 | F | info | 3 |

**菜单可见性 (sys_menu_visible)**
| dictLabel | dictValue | listClass | dictSort |
|-----------|-----------|-----------|----------|
| 显示 | 1 | success | 1 |
| 隐藏 | 0 | info | 2 |

## 🚀 使用指南

### 1. 添加新字典

```sql
-- 1. 添加字典类型
INSERT INTO dict (dictName, dictType, status, remark)
VALUES ('性别', 'sys_user_sex', 1, '用户性别');

-- 2. 添加字典数据
INSERT INTO dict_data (dictSort, dictLabel, dictValue, dictType, listClass, status)
VALUES 
(1, '男', '1', 'sys_user_sex', 'primary', 1),
(2, '女', '2', 'sys_user_sex', 'danger', 1),
(3, '未知', '0', 'sys_user_sex', 'info', 1);
```

### 2. 在前端使用新字典

```typescript
// 1. 在 constants.ts 中添加字典类型常量（可选）
export const DictTypes = {
  // ...
  USER_SEX: 'sys_user_sex',
} as const

// 2. 在组件中使用
const sexDict = useDict(DictTypes.USER_SEX)
// 或直接使用
const sexDict = useDict('sys_user_sex')
```

### 3. 刷新字典缓存

```typescript
import { useDictStore } from '@/stores/dict'

const dictStore = useDictStore()

// 刷新指定字典
await dictStore.refreshDict('sys_user_status')

// 清除所有缓存
dictStore.clearDictCache()
```

## ✅ 优势

1. **灵活性高**
   - 字典数据存储在数据库，随时可修改
   - 无需重新编译代码

2. **性能优化**
   - 自动缓存机制，已获取的字典不重复请求
   - 支持批量预加载

3. **易于维护**
   - 字典数据集中管理
   - 统一的API接口

4. **扩展性强**
   - 轻松添加新字典类型
   - 支持动态字典配置

5. **用户体验**
   - 第一次加载后即可离线使用（缓存）
   - 支持强制刷新

## 📝 注意事项

### 1. 字典缓存时机

字典数据在首次使用时自动加载并缓存：
```typescript
const statusDict = useDict(DictTypes.USER_STATUS)
// 首次调用时会从API获取并缓存
// 后续使用直接从缓存读取
```

### 2. 批量预加载

如果页面需要多个字典，可以批量预加载：
```typescript
import { useDicts } from '@/composables/useDict'

const { loadDicts, DictTypes } = useDicts()

onMounted(async () => {
  await loadDicts([
    DictTypes.USER_STATUS,
    DictTypes.ROLE_STATUS,
    DictTypes.MENU_TYPE,
  ])
})
```

### 3. 强制刷新

如果字典数据有更新，需要强制刷新：
```typescript
import { useDictStore } from '@/stores/dict'

const dictStore = useDictStore()

// 方法1：通过store刷新
await dictStore.refreshDict('sys_user_status')

// 方法2：通过useDict的forceRefresh
const statusDict = useDict(DictTypes.USER_STATUS)
await statusDict.loadDict() // 会自动检查缓存
```

### 4. 异步数据问题

由于字典是异步加载的，在使用时需注意：
```typescript
// ❌ 不好 - 可能在数据加载前就使用
const label = statusDict.getLabel(1) // 可能返回 "1" 而不是 "正常"

// ✅ 好 - 等待数据加载
await statusDict.loadDict()
const label = statusDict.getLabel(1) // 返回 "正常"

// ✅ 更好 - 在模板中直接使用（自动处理）
<template>
  {{ statusDict.getLabel(1) }} <!-- 自动等待数据加载 -->
</template>
```

## 🔄 迁移指南

从硬编码Label迁移到API字典：

### 之前
```vue
<template>
  <el-tag :type="row.status === 1 ? 'success' : 'danger'">
    {{ row.status === 1 ? '正常' : '禁用' }}
  </el-tag>
</template>

<script setup lang="ts">
import { Status, StatusLabel, StatusTagType } from '@kk/shared'
</script>
```

### 现在
```vue
<template>
  <el-tag :type="statusDict.getTagType(row.status)">
    {{ statusDict.getLabel(row.status) }}
  </el-tag>
</template>

<script setup lang="ts">
import { DictTypes } from '@kk/shared'
import { useDict } from '@/composables/useDict'

const statusDict = useDict(DictTypes.USER_STATUS)
</script>
```

## 🎉 完成状态

- [x] 移除shared包中的Label映射
- [x] 创建后端字典API接口
- [x] 初始化系统字典数据
- [x] 创建前端字典Store
- [x] 创建useDict组合式函数
- [x] 更新所有页面使用字典API
- [x] 构建测试通过

## 📚 相关文件

- **后端**
  - `apps/server/src/modules/dict/dict.controller.ts` - 字典接口
  - `apps/server/src/modules/dict/dict.service.ts` - 字典服务
  - `apps/server/prisma/seed.ts` - 字典初始数据

- **前端**
  - `apps/admin/src/stores/dict.ts` - 字典Store
  - `apps/admin/src/composables/useDict.ts` - 字典组合式函数
  - `apps/admin/src/api/dict.ts` - 字典API

- **共享**
  - `packages/shared/src/constants.ts` - 常量定义（只包含值，不包含Label）

