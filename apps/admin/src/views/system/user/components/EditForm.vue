<template>
  <KForm label-width="90px">
    <k-input label="用户名" prop="username" required />
    <k-input label="昵称" prop="nickname" required />
    <k-input label="邮箱" prop="email" required />
    <k-input label="手机号" prop="phone" required />
    <k-input label="密码" prop="password" v-if="!model.userId" required />
    <k-select
      label="角色"
      prop="roleIds"
      required
      multiple
      :options="roleList.map((item) => ({ label: item.roleName, value: item.roleId }))"
    />
    <k-radio label="状态" prop="status" required :options="statusDict.options.value" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { DictTypes, Status, type Role } from '@kk/shared'
import { getAllRoles } from '@/api/role'
import { updateUser } from '@/api/user'

const statusDict = useDict(DictTypes.USER_STATUS)

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, model, loading, validate } = useForm({
  defaultValues: {
    status: Status.NORMAL,
    roleIds: [],
    ...row,
  },
})

const roleList = ref<Role[]>([])
getAllRoles().then((res) => {
  roleList.value = res
})

async function handleSubmit() {
  await validate(updateUser)
  close()
  refresh()
}
</script>

<style lang="scss" scoped></style>
