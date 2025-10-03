<template>
  <div class="p-4">
    <el-card>
      <!-- 搜索表单 -->
      <el-form :model="queryParams" :inline="true" class="mb-4">
        <el-form-item label="用户名">
          <el-input
            v-model="queryParams.username"
            placeholder="请输入用户名"
            clearable
            @clear="handleQuery"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model="queryParams.phone"
            placeholder="请输入手机号"
            clearable
            @clear="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select 
            v-model="queryParams.status" 
            placeholder="请选择状态" 
            clearable
            style="width: 180px"
            @clear="handleQuery"
          >
            <el-option 
              v-for="item in statusDict.options.value"
              :key="item.value"
              :label="item.label" 
              :value="Number(item.value)" 
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" v-permission="['system:user:add']" @click="handleAdd">
          新增用户
        </el-button>
        <el-button type="danger" v-permission="['system:user:delete']" :disabled="!selections.length" @click="handleBatchDelete">
          批量删除
        </el-button>
      </div>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="userId" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusDict.getTagType(row.status)">
              {{ statusDict.getLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              link
              v-permission="['system:user:edit']"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              link
              v-permission="['system:user:delete']"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              type="warning"
              size="small"
              link
              @click="handleResetPassword(row)"
            >
              重置密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        class="mt-4 justify-end"
        @size-change="handleQuery"
        @current-change="handleQuery"
      />
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      @close="handleCloseDialog"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!formData.userId">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="formData.roleIds" multiple placeholder="请选择角色" class="w-full">
            <el-option
              v-for="role in roleList"
              :key="role.roleId"
              :label="role.roleName"
              :value="role.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio 
              v-for="item in statusDict.options.value"
              :key="item.value"
              :value="Number(item.value)"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { getUserList, addUser, updateUser, deleteUser, batchDeleteUser, resetPassword } from '@/api/user'
import { getAllRoles } from '@/api/role'
import { User, UserQuery, UserForm, Status, DictTypes } from '@admin-system/shared'
import { Role } from '@/types/role'
import { requiredRule, emailRule, phoneRule, passwordRule, usernameRule } from '@/utils/validate'
import { useDict } from '@/composables/useDict'

// 使用字典
const statusDict = useDict(DictTypes.USER_STATUS)

const loading = ref(false)
const dialogVisible = ref(false)
const submitLoading = ref(false)
const formRef = ref<FormInstance>()
const tableData = ref<User[]>([])
const roleList = ref<Role[]>([])
const total = ref(0)
const selections = ref<User[]>([])

const queryParams = reactive<UserQuery>({
  pageNum: 1,
  pageSize: 10,
  username: '',
  phone: '',
  status: undefined
})

const formData = reactive<UserForm>({
  userId: undefined,
  username: '',
  nickname: '',
  email: '',
  phone: '',
  password: '',
  status: Status.NORMAL,
  roleIds: []
})

const formRules: FormRules = {
  username: [requiredRule('请输入用户名'), usernameRule],
  nickname: [requiredRule('请输入昵称')],
  email: [emailRule],
  phone: [phoneRule],
  password: [passwordRule],
  roleIds: [requiredRule('请选择角色')],
  status: [requiredRule('请选择状态')]
}

const dialogTitle = ref('新增用户')

// 获取用户列表
const getList = async () => {
  loading.value = true
  try {
    const data = await getUserList(queryParams)
    tableData.value = data.list
    total.value = data.total
  } catch (error) {
    console.error('获取用户列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取角色列表
const getRoles = async () => {
  try {
    roleList.value = await getAllRoles()
  } catch (error) {
    console.error('获取角色列表失败:', error)
  }
}

// 查询
const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

// 重置
const handleReset = () => {
  queryParams.username = ''
  queryParams.phone = ''
  queryParams.status = undefined
  handleQuery()
}

// 新增
const handleAdd = () => {
  dialogTitle.value = '新增用户'
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: User) => {
  dialogTitle.value = '编辑用户'
  Object.assign(formData, {
    userId: row.userId,
    username: row.username,
    nickname: row.nickname,
    email: row.email,
    phone: row.phone,
    status: row.status,
    roleIds: row.roleIds || []
  })
  dialogVisible.value = true
}

// 删除
const handleDelete = async (row: User) => {
  try {
    await ElMessageBox.confirm(`确定删除用户"${row.username}"吗?`, '提示', {
      type: 'warning'
    })

    await deleteUser(row.userId)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {
    // 取消删除
  }
}

// 批量删除
const handleBatchDelete = async () => {
  try {
    await ElMessageBox.confirm(`确定删除选中的 ${selections.value.length} 个用户吗?`, '提示', {
      type: 'warning'
    })

    const userIds = selections.value.map(item => item.userId)
    await batchDeleteUser(userIds)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {
    // 取消删除
  }
}

// 重置密码
const handleResetPassword = async (row: User) => {
  try {
    const { value } = await ElMessageBox.prompt('请输入新密码', '重置密码', {
      inputPattern: /.{6,20}/,
      inputErrorMessage: '密码长度为6-20位'
    })

    await resetPassword(row.userId, value)
    ElMessage.success('密码已重置为: ' + value)
  } catch (error) {
    // 取消
  }
}

// 选择变化
const handleSelectionChange = (selected: User[]) => {
  selections.value = selected
}

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitLoading.value = true
      try {
        if (formData.userId) {
          await updateUser(formData.userId, formData)
          ElMessage.success('更新成功')
        } else {
          await addUser(formData)
          ElMessage.success('新增成功')
        }
        dialogVisible.value = false
        getList()
      } catch (error) {
        console.error('提交失败:', error)
      } finally {
        submitLoading.value = false
      }
    }
  })
}

// 关闭对话框
const handleCloseDialog = () => {
  formRef.value?.resetFields()
  Object.assign(formData, {
    userId: undefined,
    username: '',
    nickname: '',
    email: '',
    phone: '',
    password: '',
    status: 1,
    roleIds: []
  })
}

onMounted(() => {
  getList()
  getRoles()
})
</script>

