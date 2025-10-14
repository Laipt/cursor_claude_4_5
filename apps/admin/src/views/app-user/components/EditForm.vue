<template>
  <KForm label-width="100px">
    <k-input label="昵称" prop="nickname" required />
    <k-input label="手机号" prop="phone" />
    <k-input label="真实姓名" prop="realName" />
    <k-input-number label="余额" prop="nowMoney" :min="0" :precision="2" />
    <k-input-number label="积分" prop="integral" :min="0" />
    <k-input-number label="等级" prop="level" :min="0" />
    <k-radio label="状态" prop="status" :options="userStatusDict.options.value" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { DictTypes, AppUserStatus } from '@kk/shared'
import { updateAppUser } from '@/api/app-user'

const userStatusDict = useDict(DictTypes.APP_USER_STATUS)

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    status: AppUserStatus.NORMAL,
    nowMoney: 0,
    integral: 0,
    level: 0,
    ...row,
  },
})

async function handleSubmit() {
  await validate((data) => updateAppUser(row?.uid, data))
  close()
  refresh()
}
</script>


