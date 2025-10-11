<template>
  <KForm label-width="90px">
    <k-input label="字典名称" prop="dictName" required />
    <k-input label="字典类型" prop="dictType" required />
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
import { updateDict } from '@/api/dict'

const statusDict = useDict(DictTypes.USER_STATUS)

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    status: Status.NORMAL,
    ...row,
  },
})

async function handleSubmit() {
  await validate(updateDict)
  close()
  refresh()
}
</script>

<style lang="scss" scoped></style>
