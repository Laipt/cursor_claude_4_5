<template>
  <el-table-column>
    <template #default="{ row }">
      <el-tag :type="dict.getTagType(result(row, prop))">
        {{ dict.getLabel(result(row, prop)) }}
      </el-tag>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { result } from 'lodash-es'
import type { ElTableColumn } from 'element-plus'

const props = defineProps<{
  dictType: string
  prop: string
}>()

const dict = useDict(props.dictType)

defineExpose({} as InstanceType<typeof ElTableColumn>)
</script>

<style lang="scss" scoped></style>
