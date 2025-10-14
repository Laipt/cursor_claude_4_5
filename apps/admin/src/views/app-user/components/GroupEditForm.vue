<template>
  <KForm label-width="100px">
    <k-input label="分组名称" prop="groupName" required placeholder="请输入分组名称" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { createUserGroup, updateUserGroup } from '@/api/user-group'

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    groupName: '',
    ...row,
  },
})

async function handleSubmit() {
  await validate((data) => {
    if (row?.id) {
      return updateUserGroup(row.id, data)
    }
    return createUserGroup(data)
  })
  close()
  refresh()
}
</script>


