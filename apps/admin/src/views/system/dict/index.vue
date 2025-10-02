<template>
  <div class="p-4">
    <el-card>
      <div class="mb-4">
        <el-button type="primary" @click="handleAdd">新增字典</el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column prop="dictId" label="ID" width="80" />
        <el-table-column prop="dictName" label="字典名称" />
        <el-table-column prop="dictType" label="字典类型" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="success" size="small" link @click="handleViewData(row)">字典数据</el-button>
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

    <!-- 字典表单对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <el-form ref="formRef" :model="formData" label-width="100px">
        <el-form-item label="字典名称" required>
          <el-input v-model="formData.dictName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" required>
          <el-input v-model="formData.dictType" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">正常</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
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

    <!-- 字典数据对话框 -->
    <el-dialog v-model="dataDialogVisible" title="字典数据" width="900px">
      <div class="mb-4">
        <el-button type="primary" size="small" @click="handleAddData">新增数据</el-button>
      </div>

      <el-table :data="dictDataList" border>
        <el-table-column prop="dictLabel" label="字典标签" />
        <el-table-column prop="dictValue" label="字典键值" />
        <el-table-column prop="dictSort" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="primary" size="small" link @click="handleEditData(row)">编辑</el-button>
            <el-button type="danger" size="small" link @click="handleDeleteData(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getDictList, addDict, updateDict, deleteDict, getDictDataList, addDictData, updateDictData, deleteDictData } from '@/api/dict'
import { Dict, DictQuery, DictForm, DictData, DictDataForm } from '@/types/dict'

const loading = ref(false)
const dialogVisible = ref(false)
const dataDialogVisible = ref(false)
const tableData = ref<Dict[]>([])
const dictDataList = ref<DictData[]>([])
const total = ref(0)
const currentDict = ref<Dict | null>(null)

const queryParams = reactive<DictQuery>({
  pageNum: 1,
  pageSize: 10
})

const formData = reactive<DictForm>({
  dictId: undefined,
  dictName: '',
  dictType: '',
  status: 1,
  remark: ''
})

const dialogTitle = ref('新增字典')

const getList = async () => {
  loading.value = true
  try {
    const data = await getDictList(queryParams)
    tableData.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  dialogTitle.value = '新增字典'
  dialogVisible.value = true
}

const handleEdit = (row: Dict) => {
  dialogTitle.value = '编辑字典'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = async (row: Dict) => {
  try {
    await ElMessageBox.confirm(`确定删除字典"${row.dictName}"吗?`, '提示', { type: 'warning' })
    await deleteDict(row.dictId)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {}
}

const handleSubmit = async () => {
  try {
    if (formData.dictId) {
      await updateDict(formData.dictId, formData)
      ElMessage.success('更新成功')
    } else {
      await addDict(formData)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    getList()
  } catch (error) {}
}

const handleViewData = async (row: Dict) => {
  currentDict.value = row
  try {
    const data = await getDictDataList({ dictType: row.dictType, pageNum: 1, pageSize: 100 })
    dictDataList.value = data.list
    dataDialogVisible.value = true
  } catch (error) {}
}

const handleAddData = () => {
  ElMessage.info('字典数据新增功能待完善')
}

const handleEditData = (row: DictData) => {
  ElMessage.info('字典数据编辑功能待完善')
}

const handleDeleteData = async (row: DictData) => {
  try {
    await ElMessageBox.confirm(`确定删除该字典数据吗?`, '提示', { type: 'warning' })
    await deleteDictData(row.dictCode)
    ElMessage.success('删除成功')
    if (currentDict.value) {
      handleViewData(currentDict.value)
    }
  } catch (error) {}
}

onMounted(() => {
  getList()
})
</script>

