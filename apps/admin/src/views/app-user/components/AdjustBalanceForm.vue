<template>
  <KForm label-width="100px">
    <k-radio label="调整类型" prop="type" :options="balanceTypeDict.options.value" />
    <k-radio label="操作" prop="action" :options="balanceActionDict.options.value" />
    <k-input-number label="金额/积分" prop="amount" :min="0" :precision="2" required />
    <k-input label="备注" prop="remark" type="textarea" required />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { DictTypes, BalanceType, BalanceAction } from '@kk/shared'
import { adjustBalance } from '@/api/app-user'

const balanceTypeDict = useDict(DictTypes.BALANCE_TYPE)
const balanceActionDict = useDict(DictTypes.BALANCE_ACTION)

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    uid: row?.uid,
    type: BalanceType.MONEY,
    action: BalanceAction.ADD,
    amount: 0,
    remark: '',
  },
})

async function handleSubmit() {
  await validate(adjustBalance)
  close()
  refresh()
}
</script>


