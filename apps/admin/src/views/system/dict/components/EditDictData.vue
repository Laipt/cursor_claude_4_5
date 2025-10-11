<template>
  <KForm label-width="90px">
    <k-input prop="dictLabel" label="字典标签" required />
    <k-input prop="dictValue" label="字典键值" required />
    <k-radio label="状态" prop="status" required :options="statusDict.options.value" />
    <k-radio label="默认" prop="isDefault" required :options="isDefaultDict.options.value" />
    <k-select label="样式" prop="listClass" :options="listClass" />
    <k-input-number prop="dictSort" label="排序" required />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { DictTypes, Status, type Role } from '@kk/shared'
import { updateDictData } from '@/api/dict'

const statusDict = useDict(DictTypes.USER_STATUS)
const isDefaultDict = useDict(DictTypes.YES_NO)

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    status: Status.NORMAL,
    dictSort: 1,
    isDefault: 0,
    ...row,
  },
})

async function handleSubmit() {
  await validate(updateDictData)
  close()
  refresh()
}

const listClass = ['primary', 'success', 'info', 'warning', 'danger'].map((item) => ({ label: item, value: item }))
</script>

<style lang="scss" scoped></style>
