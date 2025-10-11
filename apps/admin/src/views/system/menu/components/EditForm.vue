<template>
  <KForm label-width="90px">
    <k-tree-select
      label="上级菜单"
      prop="parentId"
      :data="menuTreeOptions"
      :props="{ label: 'menuName', value: 'menuId', children: 'children' }"
      check-strictly
      :render-after-expand="false"
      class="w-full"
      required
    />
    <k-radio label="菜单类型" prop="menuType" required :options="menuTypeDict.options.value" />
    <k-input label="菜单名称" prop="menuName" required />
    <k-input-number label="显示排序" prop="orderNum" required />
    <k-input v-if="model.menuType !== MenuType.BUTTON" label="菜单图标" prop="icon" />
    <k-input v-if="model.menuType !== MenuType.BUTTON" label="路由路径" prop="path" required />
    <k-input v-if="model.menuType === MenuType.MENU" label="组件路径" prop="component" required />
    <k-input label="权限标识" prop="perms" required />
    <k-radio label="状态" prop="status" required :options="statusDict.options.value" />
    <k-radio label="显示状态" prop="visible" required :options="visibleDict.options.value" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { DictTypes, MenuType, Status, Visible } from '@kk/shared'
import { updateMenu } from '@/api/menu'

const menuTypeDict = useDict(DictTypes.MENU_TYPE)
const statusDict = useDict(DictTypes.USER_STATUS)
const visibleDict = useDict(DictTypes.MENU_VISIBLE)

const { tableData, close, refresh, row } = inject<any>('_dialog').value

const { KForm, model, loading, validate } = useForm({
  defaultValues: {
    parentId: 0,
    orderNum: 0,
    menuType: MenuType.MENU,
    visible: Visible.VISIBLE,
    status: Status.NORMAL,
    ...row,
  },
})
async function handleSubmit() {
  await validate(updateMenu)
  close()
  refresh()
}

const menuTreeOptions = computed(() => {
  const tree = [{ menuId: 0, menuName: '主类目', children: tableData.value }]
  return tree
})
</script>

<style lang="scss" scoped></style>
