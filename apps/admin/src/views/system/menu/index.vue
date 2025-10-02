<template>
  <div class="p-4">
    <el-card>
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" v-permission="['system:menu:add']" @click="handleAdd">
          新增菜单
        </el-button>
      </div>

      <!-- 树形表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        row-key="menuId"
        border
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="menuName" label="菜单名称" width="200" />
        <el-table-column prop="icon" label="图标" width="100">
          <template #default="{ row }">
            <el-icon v-if="row.icon"><component :is="row.icon" /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="menuType" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="menuTypeDict.getTagType(row.menuType)">
              {{ menuTypeDict.getLabel(row.menuType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderNum" label="排序" width="80" />
        <el-table-column prop="path" label="路由路径" />
        <el-table-column prop="component" label="组件路径" />
        <el-table-column prop="perms" label="权限标识" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusDict.getTagType(row.status)">
              {{ statusDict.getLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              link
              v-permission="['system:menu:edit']"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              link
              v-permission="['system:menu:delete']"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="700px">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="上级菜单">
          <el-tree-select
            v-model="formData.parentId"
            :data="menuTreeOptions"
            :props="{ label: 'menuName', value: 'menuId', children: 'children' }"
            placeholder="选择上级菜单"
            check-strictly
            :render-after-expand="false"
            class="w-full"
          />
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="formData.menuType">
            <el-radio value="M">目录</el-radio>
            <el-radio value="C">菜单</el-radio>
            <el-radio value="F">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="formData.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="显示排序" prop="orderNum">
          <el-input-number v-model="formData.orderNum" :min="0" class="w-full" />
        </el-form-item>
        <el-form-item label="菜单图标" v-if="formData.menuType !== 'F'">
          <el-input v-model="formData.icon" placeholder="请输入图标名称" />
        </el-form-item>
        <el-form-item label="路由路径" v-if="formData.menuType !== 'F'" prop="path">
          <el-input v-model="formData.path" placeholder="请输入路由路径" />
        </el-form-item>
        <el-form-item label="组件路径" v-if="formData.menuType === 'C'" prop="component">
          <el-input v-model="formData.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item label="权限标识" prop="perms">
          <el-input v-model="formData.perms" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">正常</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示状态" prop="visible">
          <el-radio-group v-model="formData.visible">
            <el-radio :value="1">显示</el-radio>
            <el-radio :value="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { getMenuTree, addMenu, updateMenu, deleteMenu } from '@/api/menu'
import { Menu, MenuForm, MenuType, MenuTypeValue, Status, Visible, DictTypes } from '@admin-system/shared'
import { requiredRule } from '@/utils/validate'
import { useDict } from '@/composables/useDict'

// 使用字典
const menuTypeDict = useDict(DictTypes.MENU_TYPE)
const statusDict = useDict(DictTypes.MENU_STATUS)

const loading = ref(false)
const dialogVisible = ref(false)
const submitLoading = ref(false)
const formRef = ref<FormInstance>()
const tableData = ref<Menu[]>([])

const formData = reactive<MenuForm>({
  menuId: undefined,
  menuName: '',
  parentId: 0,
  orderNum: 0,
  path: '',
  component: '',
  menuType: MenuType.MENU,
  visible: Visible.VISIBLE,
  status: Status.NORMAL,
  perms: '',
  icon: ''
})

const formRules: FormRules = {
  menuName: [requiredRule('请输入菜单名称')],
  orderNum: [requiredRule('请输入排序')],
  menuType: [requiredRule('请选择菜单类型')]
}

const dialogTitle = ref('新增菜单')

const menuTreeOptions = computed(() => {
  const tree = [{ menuId: 0, menuName: '主类目', children: tableData.value }]
  return tree
})

const getList = async () => {
  loading.value = true
  try {
    tableData.value = await getMenuTree()
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  dialogTitle.value = '新增菜单'
  dialogVisible.value = true
}

const handleEdit = (row: Menu) => {
  dialogTitle.value = '编辑菜单'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = async (row: Menu) => {
  try {
    await ElMessageBox.confirm(`确定删除菜单"${row.menuName}"吗?`, '提示', { type: 'warning' })
    await deleteMenu(row.menuId)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {}
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitLoading.value = true
      try {
        if (formData.menuId) {
          await updateMenu(formData.menuId, formData)
          ElMessage.success('更新成功')
        } else {
          await addMenu(formData)
          ElMessage.success('新增成功')
        }
        dialogVisible.value = false
        getList()
      } finally {
        submitLoading.value = false
      }
    }
  })
}

onMounted(() => {
  getList()
})
</script>

