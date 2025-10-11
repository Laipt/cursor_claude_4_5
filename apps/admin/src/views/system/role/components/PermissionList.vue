<template>
  <el-tree
    ref="menuTreeRef"
    :data="menuTree"
    :props="{ label: 'menuName', children: 'children' }"
    :default-checked-keys="row.menuIds"
    node-key="menuId"
    show-checkbox
    default-expand-all
  />
  <div class="mt-20px">
    <el-button @click="close">取消</el-button>
    <el-button type="primary" @click="handleSubmit">确定</el-button>
  </div>
</template>

<script setup lang="ts">
import { getMenuTree } from '@/api/menu'
import { updateRole } from '@/api/role'
import type { MenuTree } from '@kk/shared'
import type { ElTree } from 'element-plus'

const { close, refresh, row } = inject<any>('_dialog').value

const menuTreeRef = ref<InstanceType<typeof ElTree>>()
const menuTree = ref<MenuTree[]>([])

getMenuTree().then((res) => {
  menuTree.value = res
})
async function handleSubmit() {
  if (!menuTreeRef.value) return

  try {
    const checkedKeys = menuTreeRef.value.getCheckedKeys() as number[]
    const halfCheckedKeys = menuTreeRef.value.getHalfCheckedKeys() as number[]
    const menuIds = [...checkedKeys, ...halfCheckedKeys]

    await updateRole({
      ...row,
      menuIds,
    })
    close()
    refresh()
  } catch (error) {
    console.error('分配权限失败:', error)
  }
}
</script>

<style lang="scss" scoped></style>
