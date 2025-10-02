// 应用状态管理

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export interface TagView {
  title?: string
  path?: string
  name?: string | symbol
  meta?: any
}

export const useAppStore = defineStore(
  'app',
  () => {
    // 侧边栏折叠状态
    const sidebarCollapsed = ref(false)

    // 标签页列表
    const tagsViewList = ref<TagView[]>([])

    // 缓存的页面
    const cachedViews = ref<string[]>([])

    /**
     * 切换侧边栏状态
     */
    function toggleSidebar() {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    /**
     * 添加标签页
     */
    function addTagView(route: TagView) {
      if (!route.path || route.path === '/login') {
        return
      }

      const index = tagsViewList.value.findIndex(item => item.path === route.path)
      if (index === -1) {
        tagsViewList.value.push({
          path: route.path,
          name: route.name,
          title: (route.meta?.title as string) || '',
          meta: route.meta
        })
      }

      // 添加到缓存
      if (route.name && route.meta?.keepAlive !== false) {
        const name = route.name as string
        if (!cachedViews.value.includes(name)) {
          cachedViews.value.push(name)
        }
      }
    }

    /**
     * 删除标签页
     */
    function removeTagView(path: string) {
      const index = tagsViewList.value.findIndex(item => item.path === path)
      if (index !== -1) {
        const view = tagsViewList.value[index]
        tagsViewList.value.splice(index, 1)

        // 从缓存中移除
        if (view.name) {
          const cacheIndex = cachedViews.value.indexOf(view.name as string)
          if (cacheIndex !== -1) {
            cachedViews.value.splice(cacheIndex, 1)
          }
        }
      }
    }

    /**
     * 删除其他标签页
     */
    function removeOtherTagsView(path: string) {
      const view = tagsViewList.value.find(item => item.path === path)
      if (view) {
        tagsViewList.value = [view]
        cachedViews.value = view.name ? [view.name as string] : []
      }
    }

    /**
     * 删除所有标签页
     */
    function removeAllTagsView() {
      tagsViewList.value = []
      cachedViews.value = []
    }

    /**
     * 刷新当前页面
     */
    function refreshTagView(path: string) {
      const view = tagsViewList.value.find(item => item.path === path)
      if (view && view.name) {
        const name = view.name as string
        const index = cachedViews.value.indexOf(name)
        if (index !== -1) {
          cachedViews.value.splice(index, 1)
          
          // 延迟后重新添加到缓存
          setTimeout(() => {
            cachedViews.value.push(name)
          }, 0)
        }
      }
    }

    /**
     * 重置状态
     */
    function resetState() {
      sidebarCollapsed.value = false
      tagsViewList.value = []
      cachedViews.value = []
    }

    return {
      sidebarCollapsed,
      tagsViewList,
      cachedViews,
      toggleSidebar,
      addTagView,
      removeTagView,
      removeOtherTagsView,
      removeAllTagsView,
      refreshTagView,
      resetState
    }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)

