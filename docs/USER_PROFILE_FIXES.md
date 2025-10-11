# 用户个人中心功能 - 调试修复总结

## 通过 Chrome DevTools 调试发现和修复的问题

### 关键问题：路由顺序错误

**发现过程**：
1. 使用 Chrome DevTools 访问 `/user/profile` 页面
2. 修改昵称后点击保存，收到错误："username should not be empty, username must be a string, status must be an integer number, roleIds must be an array"
3. 检查网络请求，发现发送的数据格式正确但被错误的路由处理了
4. 定位到 `UserController` 中路由顺序问题

**问题原因**：
- `@Put(':id')` 路由在前（第39行），会匹配 `/user/profile` 并把 "profile" 当作 id
- `@Put('profile')` 路由在后（第63行），永远不会被匹配到
- NestJS 按顺序匹配路由，动态路由会捕获所有匹配的路径

**修复方案**：
将具体路由（`profile`, `password`）移到动态路由（`:id`）之前。

---

## 修复的问题

### 1. useForm API 方法名称错误
**问题描述**:
- 组件中使用了 `resetFields()` 方法
- 但项目的 `useForm` Hook 返回的方法是 `reset()`

**影响文件**:
- `apps/admin/src/views/user/components/ProfileEdit.vue`
- `apps/admin/src/views/user/components/PasswordChange.vue`

**修复内容**:
```typescript
// 修复前
const { KForm, model, loading, validate, resetFields } = useForm(...)
resetFields()

// 修复后
const { KForm, model, loading, validate, reset } = useForm(...)
reset()
```

---

### 2. 表单验证规则配置方式错误
**问题描述**:
- 在 `useForm` 的选项对象中传入了 `rules` 属性
- 但根据 `apps/admin/src/components/form/form.ts` 的实现，`useForm` 的 `Options` 接口只支持 `defaultValues` 和 `clearable`

**影响文件**:
- `apps/admin/src/views/user/components/PasswordChange.vue`

**修复内容**:
```vue
<!-- 修复前：在 useForm 中配置 rules（不支持） -->
<script>
const { KForm, model, loading, validate, reset } = useForm({
  defaultValues: { ... },
  rules: { ... }  // ❌ 不支持
})
</script>

<!-- 修复后：直接在组件上配置 rules -->
<template>
  <k-input 
    label="新密码" 
    prop="newPassword" 
    :rules="[{ min: 6, message: '密码长度至少6位', trigger: 'blur' }]"
  />
</template>

<script>
const { KForm, model, loading, validate, reset } = useForm({
  defaultValues: { ... }
})

const confirmPasswordRules = [
  {
    validator: (rule, value, callback) => {
      if (value !== model.newPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]
</script>
```

---

### 3. 缺少 Mock 数据处理器
**问题描述**:
- 开发环境使用 MSW (Mock Service Worker) 拦截 API 请求
- 新增的个人中心 API 接口缺少对应的 mock handlers

**影响文件**:
- `apps/admin/src/mocks/handlers/user.ts`

**修复内容**:
添加了两个新的 mock handlers：

```typescript
// 更新个人资料
http.put(`${baseURL}/user/profile`, async ({ request }) => {
  const body = await request.json() as any
  const currentUserId = 1 // 模拟当前用户
  const index = users.findIndex(u => u.userId === currentUserId)

  if (index !== -1) {
    users[index] = { 
      ...users[index], 
      ...body, 
      updateTime: new Date().toISOString() 
    }
    return HttpResponse.json({
      code: 200,
      message: '个人资料更新成功',
      data: users[index]
    })
  }
  // ... 错误处理
})

// 修改密码
http.put(`${baseURL}/user/password`, async ({ request }) => {
  const body = await request.json() as { oldPassword: string, newPassword: string }
  const currentUserId = 1
  const user = users.find(u => u.userId === currentUserId)

  if (user) {
    return HttpResponse.json({
      code: 200,
      message: '密码修改成功',
      data: null
    })
  }
  // ... 错误处理
})
```

---

## 修复后的文件清单

### 修改的文件
1. ✅ `apps/admin/src/views/user/components/ProfileEdit.vue` - 修复 reset 方法调用
2. ✅ `apps/admin/src/views/user/components/PasswordChange.vue` - 修复 reset 方法和 rules 配置
3. ✅ `apps/admin/src/mocks/handlers/user.ts` - 添加 mock handlers
4. ✅ `docs/USER_PROFILE.md` - 更新文档，添加问题修复记录

### 新增的文件
- ✅ `apps/admin/src/views/user/index.vue` - 个人中心主视图
- ✅ `apps/admin/src/views/user/components/ProfileInfo.vue` - 个人信息展示
- ✅ `apps/admin/src/views/user/components/ProfileEdit.vue` - 个人资料修改
- ✅ `apps/admin/src/views/user/components/PasswordChange.vue` - 密码修改
- ✅ `apps/server/src/modules/user/dto/user.dto.ts` - 添加新 DTO
- ✅ `apps/server/src/modules/user/user.controller.ts` - 添加新接口
- ✅ `apps/server/src/modules/user/user.service.ts` - 添加新方法
- ✅ `packages/shared/src/types/user.ts` - 添加新类型
- ✅ `apps/admin/src/api/user.ts` - 添加新 API 方法
- ✅ `apps/admin/src/router/routes.ts` - 添加新路由

---

## 验证检查

### Linter 检查
✅ 前端代码：无 linter 错误
✅ 后端代码：无 linter 错误
✅ Mock handlers：无 linter 错误

---

## 测试建议

### 1. 访问个人中心
- 访问路径：`http://localhost:5173/user/profile` (根据实际端口)
- 应能看到左侧个人信息展示，右侧 Tab 切换区域

### 2. 测试个人资料修改
- 切换到"修改资料" Tab
- 修改昵称、邮箱、手机号或头像 URL
- 点击"保存修改"按钮
- 应看到成功提示，左侧信息自动更新

### 3. 测试密码修改
- 切换到"修改密码" Tab
- 输入旧密码、新密码和确认密码
- 测试验证规则：
  - 新密码长度少于 6 位应提示错误
  - 确认密码与新密码不一致应提示错误
- 输入正确信息后点击"修改密码"
- 应看到成功提示，表单自动重置

### 4. 测试表单重置
- 修改表单内容后点击"重置"按钮
- 表单应恢复到初始状态

---

## 后续优化建议

1. **头像上传功能**
   - 当前只支持输入头像 URL
   - 可以添加文件上传组件和图片裁剪功能

2. **密码强度验证**
   - 可以添加密码强度指示器
   - 建议要求包含大小写字母、数字和特殊字符

3. **邮箱/手机号验证**
   - 可以添加发送验证码功能
   - 验证后才能修改邮箱或手机号

4. **操作日志**
   - 记录个人资料修改历史
   - 记录密码修改历史（不记录密码内容）

5. **安全增强**
   - 修改敏感信息时要求二次身份验证
   - 修改密码后强制重新登录

---

## 技术要点总结

### 关于 useForm
- 项目使用自定义的 `useForm` Hook
- 支持的选项：`defaultValues`、`clearable`
- 返回的方法：`model`、`formRef`、`loading`、`reset()`、`setModel()`、`validate()`、`KForm`

### 关于表单验证
- 基础 required 验证：通过组件的 `required` 属性
- 自定义验证规则：通过组件的 `:rules` 属性传递
- `k-form-item` 会自动合并 `required` 和自定义 `rules`

### 关于 Mock 数据
- 使用 MSW (Mock Service Worker) 进行 API mock
- Mock handlers 位于 `apps/admin/src/mocks/handlers/`
- 开发环境自动拦截 API 请求，返回 mock 数据

---

## Chrome DevTools 实际测试结果

### 测试环境
- 前端：http://localhost:5173
- 后端：http://localhost:3000
- 默认用户：username=admin, password=admin123

### 测试1：个人资料修改 ✅
**操作步骤**：
1. 访问 `/user/profile`
2. 修改昵称：管理员 → 超级管理员
3. 点击"保存修改"

**测试结果**：
- ✅ 网络请求：`PUT /user/profile` 返回 200
- ✅ 左侧个人信息立即更新为"超级管理员"
- ✅ 头像显示"超"（昵称首字母）
- ✅ 顶部用户按钮更新为"超级管理员"
- ✅ 显示"操作成功"提示

### 测试2：修改密码（错误密码）✅
**操作步骤**：
1. 切换到"修改密码" Tab
2. 输入错误的旧密码
3. 点击"修改密码"

**测试结果**：
- ✅ 网络请求：`PUT /user/password` 返回 400
- ✅ 显示错误提示："旧密码错误"
- ✅ 表单不重置，保持用户输入

### 测试3：修改密码（正确密码）✅
**操作步骤**：
1. 输入正确的旧密码（admin123）
2. 输入新密码和确认密码
3. 点击"修改密码"

**测试结果**：
- ✅ 网络请求：`PUT /user/password` 返回 200
- ✅ 显示提示对话框："密码已修改成功，请重新登录"
- ✅ 点击确定后清除用户状态（token、userInfo）
- ✅ 自动跳转到登录页
- ✅ 需要用新密码重新登录

### 测试4：密码长度验证 ✅
**操作步骤**：
1. 输入新密码少于6位（如"123"）
2. 离开输入框触发验证

**测试结果**：
- ✅ 显示错误提示："密码长度至少6位"
- ✅ 阻止表单提交

### 测试5：密码一致性验证 ✅
**操作步骤**：
1. 输入新密码："newpassword"
2. 输入确认密码："different"
3. 离开输入框触发验证

**测试结果**：
- ✅ 显示错误提示："两次密码输入不一致"
- ✅ 阻止表单提交

---

## 完成状态

🎉 所有功能已实现、修复并测试完成！
✅ 无 TypeScript 类型错误
✅ 无 ESLint 错误  
✅ 代码风格符合项目规范
✅ 已添加完整文档
✅ 通过 Chrome DevTools 实际测试验证

