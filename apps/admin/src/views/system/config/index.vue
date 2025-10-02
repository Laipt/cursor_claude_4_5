<template>
  <div class="p-4">
    <el-card>
      <div class="mb-4">
        <el-button type="primary" @click="handleAdd">新增配置</el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column prop="configId" label="ID" width="80" />
        <el-table-column prop="configName" label="配置名称" />
        <el-table-column prop="configKey" label="配置键" />
        <el-table-column prop="configValue" label="配置值" />
        <el-table-column prop="configType" label="配置类型" width="120">
          <template #default="{ row }">
            <el-tag :type="row.configType === 'system' ? 'primary' : 'success'">
              {{ row.configType === 'system' ? '系统配置' : '业务配置' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next"
        class="mt-4 justify-end"
        @size-change="getList"
        @current-change="getList"
      />
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <el-form ref="formRef" :model="formData" label-width="100px">
        <el-form-item label="配置名称" required>
          <el-input v-model="formData.configName" placeholder="请输入配置名称" />
        </el-form-item>
        <el-form-item label="配置键" required>
          <el-input v-model="formData.configKey" placeholder="请输入配置键" />
        </el-form-item>
        <el-form-item label="配置值" required>
          <el-input v-model="formData.configValue" placeholder="请输入配置值" />
        </el-form-item>
        <el-form-item label="配置类型" required>
          <el-select v-model="formData.configType" placeholder="请选择配置类型" class="w-full">
            <el-option label="系统配置" value="system" />
            <el-option label="业务配置" value="business" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getConfigList, addConfig, updateConfig, deleteConfig } from '@/api/config'
import { Config, ConfigQuery, ConfigForm } from '@/types/config'

const loading = ref(false)
const dialogVisible = ref(false)
const tableData = ref<Config[]>([])
const total = ref(0)

const queryParams = reactive<ConfigQuery>({
  pageNum: 1,
  pageSize: 10
})

const formData = reactive<ConfigForm>({
  configId: undefined,
  configName: '',
  configKey: '',
  configValue: '',
  configType: 'system',
  remark: ''
})

const dialogTitle = ref('新增配置')

const getList = async () => {
  loading.value = true
  try {
    const data = await getConfigList(queryParams)
    tableData.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  dialogTitle.value = '新增配置'
  dialogVisible.value = true
}

const handleEdit = (row: Config) => {
  dialogTitle.value = '编辑配置'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = async (row: Config) => {
  try {
    await ElMessageBox.confirm(`确定删除配置"${row.configName}"吗?`, '提示', { type: 'warning' })
    await deleteConfig(row.configId)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {}
}

const handleSubmit = async () => {
  try {
    if (formData.configId) {
      await updateConfig(formData.configId, formData)
      ElMessage.success('更新成功')
    } else {
      await addConfig(formData)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    getList()
  } catch (error) {}
}

onMounted(() => {
  getList()
})
</script>

