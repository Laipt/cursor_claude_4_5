<template>
  <el-button v-bind="$attrs" :loading="loading" @click="handleClick">
    <template #loading>
      <span></span>
    </template>
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import type { ElButton } from 'element-plus'

const porps = defineProps<{
  action: () => any | Promise<any>
}>()

let loading = $ref(false)

const handleClick = async () => {
  try {
    loading = true
    await porps.action()
  } finally {
    loading = false
  }
}

defineExpose({} as InstanceType<typeof ElButton>)
</script>

<style lang="scss" scoped></style>
