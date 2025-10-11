<template>
  <Sidebar v-if="showSidebar"></Sidebar>
  <el-drawer v-else v-model="sidebarCollapsed" direction="ltr" size="auto" :with-header="false">
    <Sidebar></Sidebar>
  </el-drawer>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'

const appStore = useAppStore()
const { sidebarCollapsed, showSidebar } = storeToRefs(appStore)

defineOptions({ name: 'SidebarLayout' })

const handleResize = () => {
  showSidebar.value = window.innerWidth > 1000
}

onMounted(() => {
  showSidebar.value = window.innerWidth > 1000
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss"></style>
