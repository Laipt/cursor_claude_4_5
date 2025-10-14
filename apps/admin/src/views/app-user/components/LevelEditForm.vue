<template>
  <KForm label-width="100px">
    <k-input-number label="等级" prop="level" :min="0" required />
    <k-input label="等级名称" prop="name" required placeholder="请输入等级名称" />
    <k-input-number label="折扣" prop="discount" :min="0" :max="100" suffix="%" />
    <k-switch label="状态" prop="isShow" :active-value="1" :inactive-value="0" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { createUserLevel, updateUserLevel } from '@/api/user-level'

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    level: 0,
    name: '',
    discount: 100,
    isShow: 1,
    ...row,
  },
})

async function handleSubmit() {
  await validate((data) => {
    if (row?.id) {
      return updateUserLevel(row.id, data)
    }
    return createUserLevel(data)
  })
  close()
  refresh()
}
</script>


