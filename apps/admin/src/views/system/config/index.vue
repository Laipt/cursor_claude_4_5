<template>
  <KTable>
    <template #actions>
      <el-button v-permission="['system:role:add']" type="primary" @click="open('新增参数')">新增参数</el-button>
    </template>
    <el-table-column prop="configName" label="配置名称" />
    <el-table-column prop="configKey" label="配置键" />
    <el-table-column prop="configValue" label="配置值" />
    <k-table-dict prop="configType" label="配置类型" width="120" dict-type="sys_config_type" />
    <el-table-column prop="remark" label="备注" show-overflow-tooltip />
    <k-table-date prop="createTime" label="创建时间" width="180" />
    <k-table-operations width="130">
      <template #default="{ row }">
        <el-button v-permission="['system:role:edit']" type="primary" @click="open('编辑参数', { row })">
          编辑
        </el-button>
        <k-async-button v-permission="['system:role:remove']" type="danger" :action="() => handleDel(row)">
          删除
        </k-async-button>
      </template>
    </k-table-operations>
  </KTable>
  <KDialog>
    <EditForm></EditForm>
  </KDialog>
</template>

<script setup lang="ts">
import * as api from '@/api/config'
import { ElMessageBox } from 'element-plus'
import EditForm from './components/EditForm.vue'

const { KTable, refresh } = useTable(api.getConfigList)

const { KDialog, open } = useDialog({ refresh })

async function handleDel(row) {
  try {
    await ElMessageBox.confirm(`确定删除吗?`, '提示')
    await api.deleteConfig(row.configId)
    refresh()
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
