<template>
  <el-menu-item
    :index="generatorPath()"
    :class="{ 'kk-single-menu': isSingle }"
    :style="{ '--el-menu-level': isSingle ? 0 : 1 }"
    @click="handleClick"
  >
    <template #title>
      <el-icon v-if="item.icon && item.parentId === 0">
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.menuName }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { Menu } from '@kk/shared'
import { isExternal } from '../../utils'

const router = useRouter()

const props = defineProps<{
  item: Menu
}>()

const isSingle = computed(() => {
  return !props.item.children?.length && props.item.parentId === 0
})

function generatorPath() {
  return props.item.path
}

function handleClick() {
  if (isExternal(props.item.path!)) {
    window.open(props.item.path)
  } else {
    router.push({ path: props.item.path })
  }
}
</script>
