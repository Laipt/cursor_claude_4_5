<template>
  <el-sub-menu :index="generatorPath(item.path!)">
    <template #title>
      <el-icon v-if="item.icon && item.parentId === 0">
        <component :is="item.icon" />
      </el-icon>
      <div :class="[item.parentId !== 0 ? 'sub-menu-active' : 'menu-active']">
        <span>{{ item.menuName }}</span>
      </div>
    </template>
    <slot />
  </el-sub-menu>
</template>

<script setup lang="ts">
import type { Menu } from '@kk/shared'
import { isExternal } from '../../utils'

const props = defineProps<{
  item: Menu
}>()

function generatorPath(childPath: string) {
  if (isExternal(childPath)) {
    return childPath
  }
  return props.item.path!
}
</script>
