<template>
  <aside 
    class="bg-gray-800 text-white transition-all duration-300" 
    :class="[collapsed ? 'w-16' : 'w-64']"
  >
    <!-- Logo -->
    <div class="h-16 flex-center border-b border-gray-700">
      <span v-if="!collapsed" class="text-xl font-bold">后台管理</span>
      <span v-else class="text-xl font-bold">后台</span>
    </div>

    <!-- 菜单 -->
    <el-scrollbar class="h-[calc(100vh-64px)]">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :unique-opened="true"
        background-color="#1f2937"
        text-color="#fff"
        active-text-color="#409EFF"
        :collapse-transition="false"
        router
      >
        <MenuItem
          v-for="menu in menuTree"
          :key="menu.menuId"
          :menu="menu"
          :collapsed="collapsed"
        />
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'
import MenuItem from './MenuItem.vue'

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const collapsed = computed(() => appStore.sidebarCollapsed)
const menuTree = computed(() => permissionStore.menus)
const activeMenu = computed(() => route.path)
</script>

