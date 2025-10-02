# 更新日志

## 2024-01-02

### 修复

#### 1. Element Plus 中文配置
- **问题**: Element Plus 组件默认使用英文，分页、日期选择器等组件显示英文文本
- **修复**: 在 `src/main.ts` 中引入并配置 Element Plus 中文语言包
- **变更文件**: `src/main.ts`

```typescript
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

app.use(ElementPlus, {
  locale: zhCn,
})
```

#### 2. 用户管理状态选择器样式优化
- **问题**: 状态选择器宽度不固定，UI 显示不美观
- **修复**: 为状态选择器添加固定宽度 `180px`，并添加 `@clear` 事件处理
- **变更文件**: `src/views/system/user/index.vue`

```vue
<el-select 
  v-model="queryParams.status" 
  placeholder="请选择状态" 
  clearable
  style="width: 180px"
  @clear="handleQuery"
>
  <el-option label="正常" :value="1" />
  <el-option label="禁用" :value="0" />
</el-select>
```

### 效果
- ✅ 分页组件显示中文："共 X 条"、"X条/页"、"上一页"、"下一页"、"前往"、"页"
- ✅ 表格组件显示中文："暂无数据"
- ✅ 日期选择器显示中文月份和星期
- ✅ 状态选择器宽度固定，样式统一
- ✅ 清空选择器后自动触发查询

## 2024-01-01

### 初始版本
- 实现基础后台管理系统框架
- 集成 Vue 3 + TypeScript + Element Plus + UnoCSS + Pinia + Vue Router
- 实现 RBAC 权限管理系统
- 集成 MSW 进行 API Mock
- 实现用户管理、角色管理、菜单管理、字典管理、配置管理等功能模块

