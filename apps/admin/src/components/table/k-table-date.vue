<template>
  <el-table-column>
    <template #default="{ row }">
      {{ dayjs(result(row, prop)).format(format ?? 'YYYY-MM-DD') }}
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { result } from 'lodash-es'
import { dayjs } from 'element-plus'
import type { ElTableColumn } from 'element-plus'

defineProps<{
  format?: string
  prop: string
}>()

defineExpose({} as InstanceType<typeof ElTableColumn>)
</script>

<style lang="scss" scoped></style>
