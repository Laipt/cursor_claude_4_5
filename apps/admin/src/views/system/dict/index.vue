<template>
  <KTable :expand-row-keys="expandKeys" row-key="dictId" @expand-change="handleExpandChange">
    <template #actions>
      <el-button type="primary" @click="open('新增字典')">新增字典</el-button>
    </template>
    <el-table-column prop="dictName" label="字典名称" />
    <el-table-column prop="dictType" label="字典类型" />
    <k-table-dict prop="status" label="状态" width="100" :dict-type="DictTypes.USER_STATUS" />
    <el-table-column prop="remark" label="备注" />
    <k-table-date prop="createTime" label="创建时间" width="180" />
    <el-table-column label="数据" width="100" type="expand">
      <template #expand>
        <el-button type="text" size="small">字典数据</el-button>
      </template>
      <template #default="{ row }">
        <DictData v-if="expandKeys.includes(row.dictId)" :dict-type="row.dictType" />
      </template>
    </el-table-column>
    <k-table-operations width="130">
      <template #default="{ row }">
        <el-button type="primary" @click="open('编辑字典', { row })">编辑</el-button>
        <k-async-button type="danger" :action="() => handleDel(row)">删除</k-async-button>
      </template>
    </k-table-operations>
  </KTable>
  <KDialog>
    <EditForm />
  </KDialog>
</template>

<script setup lang="ts">
import * as api from '@/api/dict'
import { DictTypes } from '@kk/shared'
import EditForm from './components/EditForm.vue'
import { ElMessageBox } from 'element-plus'
import DictData from './components/DictData.vue'

const { KTable, refresh } = useTable(api.getDictList)

const { KDialog, open } = useDialog({ refresh })

const handleDel = async (row) => {
  await ElMessageBox.confirm('确定删除该字典吗?', '提示')
  await api.deleteDict(row.dictId)
  refresh()
}

const expandKeys = ref<any[]>([])
const handleExpandChange = (row, arr) => {
  if (arr.length) {
    expandKeys.value = [row.dictId]
  } else {
    expandKeys.value = []
  }
}
</script>

<style lang="scss" scoped></style>
