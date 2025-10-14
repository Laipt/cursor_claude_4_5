<template>
  <KTable row-key="id">
    <template #actions>
      <el-button type="primary" @click="open('新增等级')">新增等级</el-button>
    </template>

    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="level" label="等级" width="100" />
    <el-table-column prop="name" label="等级名称" />
    <el-table-column prop="discount" label="折扣" width="120">
      <template #default="{ row }">
        {{ row.discount ? row.discount + '%' : '-' }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100">
      <template #default="{ row }">
        <el-tag :type="row.isShow === 1 ? 'success' : 'info'">
          {{ row.isShow === 1 ? '启用' : '禁用' }}
        </el-tag>
      </template>
    </el-table-column>
    <k-table-operations width="150">
      <template #default="{ row }">
        <el-button link type="primary" @click="open('编辑等级', { row })">编辑</el-button>
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
import { DictTypes } from '@kk/shared'
import * as api from '@/api/user-level'
import EditForm from './components/LevelEditForm.vue'

const { KTable, refresh } = useTable(api.getUserLevelList)

const { KDialog, open } = useDialog({ refresh })

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('确认删除该等级吗？', '提示', { type: 'warning' })
  await api.deleteUserLevel(row.id)
  refresh()
}
</script>


