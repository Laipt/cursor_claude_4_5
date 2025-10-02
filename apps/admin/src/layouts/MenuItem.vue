<template>
  <!-- 判断是否有可显示的子菜单（排除按钮类型F） -->
  <template v-if="!hasVisibleChildren">
    <!-- 单个菜单项 -->
    <el-menu-item
      v-if="menu.menuType === MenuTypeValue.MENU && menu.visible === Visible.VISIBLE"
      :index="fullPath"
    >
      <el-icon v-if="menu.icon">
        <component :is="menu.icon" />
      </el-icon>
      <template #title>
        <span>{{ menu.menuName }}</span>
      </template>
    </el-menu-item>
  </template>

  <template v-else>
    <!-- 子菜单 -->
    <el-sub-menu
      v-if="menu.menuType === MenuTypeValue.DIRECTORY && menu.visible === Visible.VISIBLE"
      :index="fullPath"
    >
      <template #title>
        <el-icon v-if="menu.icon">
          <component :is="menu.icon" />
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      
      <MenuItem
        v-for="child in visibleChildren"
        :key="child.menuId"
        :menu="child"
        :parent-path="fullPath"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Menu, MenuTypeValue, Visible } from '@admin-system/shared'

const props = defineProps<{
  menu: Menu
  collapsed?: boolean
  parentPath?: string
}>()

// 构造完整路径
const fullPath = computed(() => {
  const menuPath = props.menu.path || ''
  
  // 如果已经是绝对路径，直接返回
  if (menuPath.startsWith('/')) {
    return menuPath
  }
  
  // 如果有父路径，拼接父路径
  if (props.parentPath) {
    return `${props.parentPath}/${menuPath}`.replace(/\/+/g, '/')
  }
  
  // 否则直接返回路径
  return `/${menuPath}`.replace(/\/+/g, '/')
})

// 过滤出可见的子菜单（排除按钮类型F）
const visibleChildren = computed(() => {
  if (!props.menu.children || props.menu.children.length === 0) {
    return []
  }
  return props.menu.children.filter((child: Menu) => child.menuType !== MenuTypeValue.BUTTON)
})

// 判断是否有可显示的子菜单
const hasVisibleChildren = computed(() => {
  return visibleChildren.value.length > 0
})
</script>

