<template>
  <div class="p-4">
    <el-card>
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" v-permission="['system:role:add']" @click="handleAdd">
          新增角色
        </el-button>
      </div>

      <!-- 表格 -->
      <el-table v-loading="loading" :data="tableData" border>
        <el-table-column prop="roleId" label="ID" width="80" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleKey" label="权限字符" />
        <el-table-column prop="roleSort" label="排序" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusDict.getTagType(row.status)">
              {{ statusDict.getLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              link
              v-permission="['system:role:edit']"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="success"
              size="small"
              link
              @click="handleAssignMenu(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="danger"
              size="small"
              link
              v-permission="['system:role:delete']"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
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
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" @close="handleCloseDialog">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formData.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="formData.roleKey" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="排序" prop="roleSort">
          <el-input-number v-model="formData.roleSort" :min="1" class="w-full" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">正常</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog v-model="menuDialogVisible" title="分配权限" width="600px">
      <el-tree
        ref="menuTreeRef"
        :data="menuTree"
        :props="{ label: 'menuName', children: 'children' }"
        :default-checked-keys="checkedMenuIds"
        node-key="menuId"
        show-checkbox
        default-expand-all
      />

      <template #footer>
        <el-button @click="menuDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitMenu">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import type { ElTree } from 'element-plus'
import { getRoleList, addRole, updateRole, deleteRole } from '@/api/role'
import { getMenuTree } from '@/api/menu'
import { Role, RoleQuery, RoleForm, MenuTree, Status, DictTypes } from '@admin-system/shared'
import { requiredRule } from '@/utils/validate'
import { useDict } from '@/composables/useDict'

// 使用字典
const statusDict = useDict(DictTypes.ROLE_STATUS)

const loading = ref(false)
const dialogVisible = ref(false)
const menuDialogVisible = ref(false)
const submitLoading = ref(false)
const formRef = ref<FormInstance>()
const menuTreeRef = ref<InstanceType<typeof ElTree>>()
const tableData = ref<Role[]>([])
const menuTree = ref<MenuTree[]>([])
const total = ref(0)
const checkedMenuIds = ref<number[]>([])
const currentRole = ref<Role | null>(null)

const queryParams = reactive<RoleQuery>({
  pageNum: 1,
  pageSize: 10
})

const formData = reactive<RoleForm>({
  roleId: undefined,
  roleName: '',
  roleKey: '',
  roleSort: 1,
  status: Status.NORMAL,
  menuIds: [],
  remark: ''
})

const formRules: FormRules = {
  roleName: [requiredRule('请输入角色名称')],
  roleKey: [requiredRule('请输入权限字符')],
  roleSort: [requiredRule('请输入排序')],
  status: [requiredRule('请选择状态')]
}

const dialogTitle = ref('新增角色')

const getList = async () => {
  loading.value = true
  try {
    const data = await getRoleList(queryParams)
    tableData.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

const getMenuTreeData = async () => {
  try {
    menuTree.value = await getMenuTree()
  } catch (error) {
    console.error('获取菜单树失败:', error)
  }
}

const handleAdd = () => {
  dialogTitle.value = '新增角色'
  dialogVisible.value = true
}

const handleEdit = (row: Role) => {
  dialogTitle.value = '编辑角色'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = async (row: Role) => {
  try {
    await ElMessageBox.confirm(`确定删除角色"${row.roleName}"吗?`, '提示', { type: 'warning' })
    await deleteRole(row.roleId)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {}
}

const handleAssignMenu = (row: Role) => {
  currentRole.value = row
  checkedMenuIds.value = row.menuIds || []
  menuDialogVisible.value = true
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitLoading.value = true
      try {
        if (formData.roleId) {
          await updateRole(formData.roleId, formData)
          ElMessage.success('更新成功')
        } else {
          await addRole(formData)
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

const handleSubmitMenu = async () => {
  if (!currentRole.value || !menuTreeRef.value) return

  try {
    const checkedKeys = menuTreeRef.value.getCheckedKeys() as number[]
    const halfCheckedKeys = menuTreeRef.value.getHalfCheckedKeys() as number[]
    const menuIds = [...checkedKeys, ...halfCheckedKeys]

    await updateRole(currentRole.value.roleId, {
      ...currentRole.value,
      menuIds
    })

    ElMessage.success('分配权限成功')
    menuDialogVisible.value = false
    getList()
  } catch (error) {
    console.error('分配权限失败:', error)
  }
}

const handleCloseDialog = () => {
  formRef.value?.resetFields()
  Object.assign(formData, {
    roleId: undefined,
    roleName: '',
    roleKey: '',
    roleSort: 1,
    status: 1,
    menuIds: [],
    remark: ''
  })
}

onMounted(() => {
  getList()
  getMenuTreeData()
})
</script>

