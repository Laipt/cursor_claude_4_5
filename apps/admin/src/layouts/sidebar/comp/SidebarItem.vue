<template>
  <component :is="item?.children?.length ? SubMenuItem : MenuItem" :item="item">
    <template v-if="item?.children?.length">
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :full-path="generatorPath(item.path!)"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import { MenuTypeValue, type Menu } from '@kk/shared'
import { isExternal } from '../../utils'
import MenuItem from './MenuItem.vue'
import SubMenuItem from './SubMenuItem.vue'

const props = defineProps<{
  item: Menu
}>()

function generatorPath(childPath: string) {
  if (isExternal(childPath)) {
    return childPath
  }
  return childPath
}
</script>
