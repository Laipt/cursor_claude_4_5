<template>
  <el-table-column label="操作" :fixed="fixed" v-bind="$attrs">
    <template #default="rows">
      <div class="kk-operations">
        <el-config-provider size="small">
          <slot v-bind="{ ...rows }"></slot>
        </el-config-provider>
      </div>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import type { ElTableColumn } from 'element-plus'

let fixed = $ref<any>('right')
function handleResize() {
  fixed = window.innerWidth > 1000 ? 'right' : false
}
onMounted(() => {
  fixed = window.innerWidth > 1000 ? 'right' : false
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

defineExpose({} as InstanceType<typeof ElTableColumn>)
</script>

<style lang="scss" scoped></style>
