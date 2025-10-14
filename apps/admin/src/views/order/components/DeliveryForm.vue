<template>
  <KForm label-width="100px">
    <k-select label="发货类型" prop="deliveryType" :options="deliveryTypeOptions" />
    <k-input label="快递公司" prop="deliveryName" required placeholder="请输入快递公司" />
    <k-input label="快递单号" prop="deliveryId" required placeholder="请输入快递单号" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { DeliveryType } from '@kk/shared'
import { deliveryOrder } from '@/api/order'

const deliveryTypeOptions = [
  { label: '快递', value: DeliveryType.EXPRESS },
  { label: '送货上门', value: DeliveryType.HOME_DELIVERY },
  { label: '到店自提', value: DeliveryType.SELF_PICKUP },
]

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    deliveryName: '',
    deliveryId: '',
    deliveryType: DeliveryType.EXPRESS,
  },
})

async function handleSubmit() {
  await validate((data) => deliveryOrder(row.id, data))
  close()
  refresh()
}
</script>


