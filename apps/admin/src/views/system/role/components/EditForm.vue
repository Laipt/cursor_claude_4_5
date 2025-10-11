<template>
  <KForm label-width="90px">
    <k-input label="角色名称" prop="roleName" required />
    <k-input label="权限字符" prop="roleKey" required />
    <k-input-number label="排序" prop="roleSort" required />
    <k-radio label="状态" prop="status" required :options="statusDict.options.value" />
    <k-input label="备注" prop="remark" type="textarea" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { DictTypes, Status, type Role } from '@kk/shared'
import { getAllRoles } from '@/api/role'
import { updateRole } from '@/api/role'

const statusDict = useDict(DictTypes.USER_STATUS)

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    status: Status.NORMAL,
    roleSort: 1,
    menuIds: [],
    ...row,
  },
})

const roleList = ref<Role[]>([])
getAllRoles().then((res) => {
  roleList.value = res
})

async function handleSubmit() {
  await validate(updateRole)
  close()
  refresh()
}
</script>

<style lang="scss" scoped></style>
