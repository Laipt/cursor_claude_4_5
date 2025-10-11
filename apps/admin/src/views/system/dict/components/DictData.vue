<template>
  <el-card class="mx-50px">
    <KTable>
      <template #actions>
        <el-button type="primary" @click="open('新增字典数据', { row: { dictType } })">新增字典</el-button>
      </template>
      <el-table-column prop="dictLabel" label="字典标签" />
      <el-table-column prop="dictValue" label="字典键值" />
      <el-table-column prop="dictSort" label="排序" width="80" />
      <k-table-dict prop="status" label="状态" width="100" :dict-type="DictTypes.USER_STATUS" />
      <k-table-operations width="130">
        <template #default="{ row }">
          <el-button type="primary" @click="open('编辑字典数据', { row: { dictType, ...row } })">编辑</el-button>
          <k-async-button type="danger" :action="() => handleDel(row)">删除</k-async-button>
        </template>
      </k-table-operations>
    </KTable>
  </el-card>
  <KDialog append-to-body>
    <EditDictData />
  </KDialog>
</template>

<script setup lang="ts">
import * as api from '@/api/dict'
import { DictTypes } from '@kk/shared'
import { ElMessageBox } from 'element-plus'
import EditDictData from './EditDictData.vue'

const props = defineProps<{
  dictType: string
}>()

const { KTable, refresh } = useTable(api.getDictDataList, {
  params: {
    dictType: props.dictType,
  },
})

const { KDialog, open } = useDialog({ refresh })

const handleDel = async (row) => {
  await ElMessageBox.confirm('确定删除该字典吗数据?', '提示')
  await api.deleteDictData(row.dictCode)
  refresh()
}
</script>

<style lang="scss" scoped></style>
