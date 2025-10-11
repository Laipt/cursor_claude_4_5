<template>
  <KTable>
    <template #actions>
      <el-button v-permission="['system:role:add']" type="primary" @click="open('新增角色')">新增角色</el-button>
    </template>
    <el-table-column prop="roleId" label="ID" width="80" />
    <el-table-column prop="roleName" label="角色名称" />
    <el-table-column prop="roleKey" label="权限字符" />
    <el-table-column prop="roleSort" label="排序" width="100" />
    <k-table-dict label="状态" prop="status" width="100" :dict-type="DictTypes.ROLE_STATUS" />
    <k-table-date prop="createTime" label="创建时间" width="180" />
    <k-table-operations width="200">
      <template #default="{ row }">
        <el-button v-permission="['system:role:edit']" type="primary" @click="open('编辑角色', { row })">
          编辑
        </el-button>
        <el-button type="success" @click="permissionOpen('分配权限', { row })">分配权限</el-button>
        <k-async-button v-permission="['system:role:remove']" type="danger" :action="() => handleDel(row)">
          删除
        </k-async-button>
      </template>
    </k-table-operations>
  </KTable>
  <KDialog>
    <EditForm></EditForm>
  </KDialog>
  <PermissionDialog>
    <PermissionList />
  </PermissionDialog>
</template>

<script setup lang="ts">
import { DictTypes } from '@kk/shared'
import * as api from '@/api/role'
import { ElMessageBox } from 'element-plus'
import EditForm from './components/EditForm.vue'
import PermissionList from './components/PermissionList.vue'

const { KTable, refresh } = useTable(api.getRoleList)

const { KDialog, open } = useDialog({ refresh })
const { KDialog: PermissionDialog, open: permissionOpen } = useDialog({ refresh })

async function handleDel(row) {
  try {
    await ElMessageBox.confirm(`确定删除角色"${row.roleName}"吗?`, '提示', { type: 'warning' })
    await api.deleteRole(row.roleId)
    refresh()
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
