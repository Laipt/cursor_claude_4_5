<template>
  <KTable row-key="id">
    <template #actions>
      <el-button type="primary" @click="open('新增分组')">新增分组</el-button>
    </template>

    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="groupName" label="分组名称" />
    <k-table-date prop="createTime" label="创建时间" width="180" />
    <k-table-operations width="150">
      <template #default="{ row }">
        <el-button link type="primary" @click="open('编辑分组', { row })">编辑</el-button>
        <k-async-button link type="danger" :action="() => handleDelete(row)">删除</k-async-button>
      </template>
    </k-table-operations>
  </KTable>

  <KDialog>
    <EditForm />
  </KDialog>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import * as api from '@/api/user-group'
import EditForm from './components/GroupEditForm.vue'

const { KTable, refresh } = useTable(api.getUserGroupList)

const { KDialog, open } = useDialog({ refresh })

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('确认删除该分组吗？', '提示', { type: 'warning' })
  await api.deleteUserGroup(row.id)
  refresh()
}
</script>


