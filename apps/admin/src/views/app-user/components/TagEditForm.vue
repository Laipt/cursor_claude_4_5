<template>
  <KForm label-width="100px">
    <k-input label="标签名称" prop="tagName" required placeholder="请输入标签名称" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { createUserTag, updateUserTag } from '@/api/user-tag'

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    tagName: '',
    ...row,
  },
})

async function handleSubmit() {
  await validate((data) => {
    if (row?.id) {
      return updateUserTag(row.id, data)
    }
    return createUserTag(data)
  })
  close()
  refresh()
}
</script>


