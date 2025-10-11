<template>
  <KTable show-selection row-key="userId">
    <template #query>
      <k-input label="用户名" prop="username" />
      <k-input label="手机号" prop="phone" />
      <k-select label="状态" prop="status" :options="statusDict.options.value" />
    </template>
    <template #actions>
      <el-button v-permission="['system:user:add']" type="primary" @click="open('新增用户')">新增用户</el-button>
      <el-button
        v-permission="['system:user:remove']"
        :disabled="!selectedRows.length"
        type="danger"
        @click="handleBatchDelete"
      >
        批量删除
      </el-button>
    </template>
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="nickname" label="昵称" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="phone" label="手机号" />
    <k-table-dict label="状态" prop="status" :dict-type="DictTypes.USER_STATUS" />
    <k-table-operations width="200">
      <template #default="{ row }">
        <k-async-button v-permission="['system:user:edit']" type="primary" :action="() => open('编辑用户', { row })">
          编辑
        </k-async-button>
        <k-async-button v-permission="['system:user:remove']" type="danger" :action="() => handeleDel(row)">
          删除
        </k-async-button>
        <k-async-button v-permission="['system:user:resetPwd']" type="warning" :action="() => handleResetPassword(row)">
          重置密码
        </k-async-button>
      </template>
    </k-table-operations>
  </KTable>
  <KDialog>
    <EditForm />
  </KDialog>
</template>

<script setup lang="ts">
import { DictTypes } from '@kk/shared'
import * as api from '@/api/user'
import EditForm from './components/EditForm.vue'
import { ElMessageBox } from 'element-plus'

const statusDict = useDict(DictTypes.USER_STATUS)

const { KTable, refresh, selectedRows } = useTable(api.getUserList)

const { KDialog, open } = useDialog({ refresh })

const handleBatchDelete = async () => {
  try {
    await ElMessageBox.confirm(`确定删除选中的 ${selectedRows.value.length} 个用户吗?`, '提示', {
      type: 'warning',
    })

    const userIds = selectedRows.value.map((item) => item.userId)
    await api.batchDeleteUser(userIds)
    refresh()
  } catch (error) {
    // 取消删除
  }
}
const handeleDel = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除吗？', '提示')
    await api.deleteUser(row.userId)
    refresh()
  } catch (error) {}
}
const handleResetPassword = async (row) => {
  try {
    const { value } = await ElMessageBox.prompt('重置密码')
    await api.resetPassword(row.userId, value)
  } catch {}
}
</script>

<style lang="scss" scoped></style>
