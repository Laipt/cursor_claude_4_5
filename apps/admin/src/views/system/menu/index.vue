<template>
  <KTable row-key="menuId" :show-index="false">
    <template #actions>
      <el-button v-permission="['system:menu:add']" type="primary" @click="open('新增菜单')">新增菜单</el-button>
    </template>
    <el-table-column prop="menuName" label="菜单名称" width="200" />
    <el-table-column prop="orderNum" label="排序" width="80" />
    <el-table-column prop="path" label="路由路径" />
    <el-table-column prop="component" label="组件路径" />
    <el-table-column prop="perms" label="权限标识" />
    <k-table-operations width="220px">
      <template #default="{ row }">
        <el-button v-permission="['system:menu:edit']" type="primary" @click="open('编辑菜单', { row })">
          编辑
        </el-button>
        <el-button
          v-permission="['system:menu:add']"
          type="success"
          @click="open('新增菜单', { row: { parentId: row.menuId } })"
        >
          新增子菜单
        </el-button>
        <k-async-button v-permission="['system:menu:remove']" type="danger" :action="() => handleDel(row)">
          删除
        </k-async-button>
      </template>
    </k-table-operations>
  </KTable>
  <KDialog>
    <EditForm />
  </KDialog>
</template>

<script setup lang="ts">
import * as api from '@/api/menu'
import EditForm from './components/EditForm.vue'
import { ElMessageBox } from 'element-plus'
const { KTable, refresh, data: tableData } = useTable(api.getMenuTree)

const { KDialog, open } = useDialog({ refresh, tableData })

const handleDel = async (row) => {
  await ElMessageBox.confirm('确定删除吗？', '提示')
  await api.deleteMenu(row.menuId)
  refresh()
}
</script>

<style lang="scss" scoped></style>
