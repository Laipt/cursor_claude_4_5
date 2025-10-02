<template>
  <div class="h-screen flex overflow-hidden">
    <!-- 侧边栏 -->
    <Sidebar />
    
    <!-- 主内容区 -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- 顶部栏 -->
      <Header />
      
      <!-- 标签页 -->
      <TagsView />
      
      <!-- 内容区 -->
      <main class="flex-1 overflow-auto p-4 bg-gray-100">
        <router-view v-slot="{ Component }">
          <keep-alive :include="cachedViews">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import TagsView from './TagsView.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const cachedViews = computed(() => appStore.cachedViews)
</script>

