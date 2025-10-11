<template>
  <KForm label-width="90px">
    <k-input prop="configName" label="配置名称" required />
    <k-input prop="configKey" label="配置键" required />
    <k-input prop="configValue" label="配置值" required />
    <k-radio prop="configType" label="配置类型" required :options="configTypeDict.options.value" />
    <k-input prop="remark" label="备注" type="textarea" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { updateConfig } from '@/api/config'

const configTypeDict = useDict('sys_config_type')

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    ...row,
  },
})

async function handleSubmit() {
  await validate(updateConfig)
  close()
  refresh()
}
</script>

<style lang="scss" scoped></style>
