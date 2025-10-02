<template>
  <div class="tags-view h-10 bg-white border-b flex items-center px-2 overflow-x-auto">
    <div
      v-for="tag in tagsViewList"
      :key="tag.path"
      class="tag-item h-7 px-3 mr-2 flex items-center cursor-pointer text-sm rounded transition-all"
      :class="[isActive(tag.path) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
      @click="handleClickTag(tag)"
      @contextmenu.prevent="handleRightClick(tag, $event)"
    >
      <span>{{ tag.title }}</span>
      <el-icon
        v-if="tagsViewList.length > 1"
        class="ml-2 hover:bg-gray-300 rounded-full"
        @click.stop="handleCloseTag(tag.path!)"
      >
        <Close />
      </el-icon>
    </div>

    <!-- 右键菜单 -->
    <ul
      v-if="contextMenuVisible"
      class="context-menu fixed bg-white shadow-lg rounded py-1 z-50"
      :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
    >
      <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="handleRefresh">
        刷新
      </li>
      <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="handleCloseOthers">
        关闭其他
      </li>
      <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="handleCloseAll">
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Close } from '@element-plus/icons-vue'
import { useAppStore, TagView } from '@/stores/app'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const tagsViewList = computed(() => appStore.tagsViewList)

const isActive = (path?: string) => {
  return path === route.path
}

const handleClickTag = (tag: TagView) => {
  if (tag.path && tag.path !== route.path) {
    router.push(tag.path)
  }
}

const handleCloseTag = (path: string) => {
  const index = tagsViewList.value.findIndex(item => item.path === path)
  appStore.removeTagView(path)

  // 如果关闭的是当前标签，跳转到最后一个标签
  if (isActive(path) && tagsViewList.value.length > 0) {
    const targetIndex = index > 0 ? index - 1 : 0
    const targetTag = tagsViewList.value[targetIndex]
    if (targetTag.path) {
      router.push(targetTag.path)
    }
  }
}

// 右键菜单
const contextMenuVisible = ref(false)
const contextMenuLeft = ref(0)
const contextMenuTop = ref(0)
const selectedTag = ref<TagView | null>(null)

const handleRightClick = (tag: TagView, event: MouseEvent) => {
  selectedTag.value = tag
  contextMenuLeft.value = event.clientX
  contextMenuTop.value = event.clientY
  contextMenuVisible.value = true
}

const handleRefresh = () => {
  if (selectedTag.value?.path) {
    appStore.refreshTagView(selectedTag.value.path)
    router.replace({ path: '/redirect' + selectedTag.value.path })
  }
  contextMenuVisible.value = false
}

const handleCloseOthers = () => {
  if (selectedTag.value?.path) {
    appStore.removeOtherTagsView(selectedTag.value.path)
    if (!isActive(selectedTag.value.path)) {
      router.push(selectedTag.value.path)
    }
  }
  contextMenuVisible.value = false
}

const handleCloseAll = () => {
  appStore.removeAllTagsView()
  router.push('/home')
  contextMenuVisible.value = false
}

const closeContextMenu = () => {
  contextMenuVisible.value = false
}

onMounted(() => {
  document.addEventListener('click', closeContextMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeContextMenu)
})
</script>

<style scoped>
.tags-view {
  -webkit-overflow-scrolling: touch;
}

.tags-view::-webkit-scrollbar {
  height: 6px;
}

.tags-view::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}
</style>

