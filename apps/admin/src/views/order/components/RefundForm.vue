<template>
  <KForm label-width="100px">
    <k-input-number label="退款金额" prop="refundPrice" :min="0" :precision="2" required />
    <k-input label="退款原因" prop="refundReason" type="textarea" required />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { refundOrder } from '@/api/order'

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    refundPrice: Number(row?.payPrice || 0),
    refundReason: '',
  },
})

async function handleSubmit() {
  await validate((data) => refundOrder(row.id, data))
  close()
  refresh()
}
</script>


