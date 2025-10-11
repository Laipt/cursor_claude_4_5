<template>
  <div class="side-wrapper">
    <el-scrollbar>
      <el-menu :default-active="activePath" unique-opened>
        <SidebarItem v-for="item in routers" :key="item.path" :item="item" show-icon></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { MenuTypeValue, Visible, type Menu } from '@kk/shared'
import SidebarItem from './comp/SidebarItem.vue'

defineOptions({ name: 'SidebarLeft' })

const permissionStore = usePermissionStore()
const { menus } = storeToRefs(permissionStore)
const routers = computed(() => {
  return filterMenus(menus.value)
})
function filterMenus(tree: Menu[]) {
  return tree.filter((item) => {
    item.children = filterMenus(item.children ?? [])
    return item.visible === Visible.VISIBLE && item.menuType !== MenuTypeValue.BUTTON
  })
}

const route = useRoute()
const activePath = computed(() => (route.meta?.activeMenu as string) ?? route.fullPath)
</script>

<style lang="scss">
.side-wrapper {
  height: 100%;
  width: var(--menu-width);
  background-color: #fff;
  * {
    user-select: none;
  }
  .el-menu {
    border-right: none;
    background: none;
  }
  .el-menu-item:hover,
  .el-sub-menu__title:hover {
    background: none;
  }
  .el-sub-menu.is-active {
    .el-menu {
      background: none;
    }
  }
  .sub-menu-active {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: -15px;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #c6d5ea;
    }
  }
  .el-sub-menu.is-opened {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 10px;
      bottom: 0px;
      right: 10px;
      background-color: #f2f5fa;
      border-radius: 8px;
    }
  }
  .el-sub-menu.is-active > .el-sub-menu__title {
    i {
      color: #fff;
      z-index: 1;
    }
    .menu-active {
      color: #fff;
      &::before {
        content: '';
        position: absolute;
        left: 10px;
        top: 5px;
        right: 10px;
        bottom: 5px;
        background-color: var(--el-color-primary);
        border-radius: 8px;
        animation: active-menu 0.3s ease;
      }
      &::after {
        content: '';
        position: absolute;
        width: 3px;
        top: 5px;
        left: 0;
        bottom: 5px;
        background-color: var(--el-color-primary);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      span {
        position: absolute;
        top: 0;
      }
    }
    .sub-menu-active {
      position: relative;
      color: var(--el-color-primary);
      &::before {
        content: '';
        position: absolute;
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: var(--el-color-primary);
      }
      & ~ i {
        color: var(--el-color-primary);
      }
    }
  }
  .el-menu-item.is-active {
    &::before {
      content: '';
      position: absolute;
      left: 20px;
      right: 20px;
      top: 6px;
      bottom: 6px;
      background-color: #fff;
      border-radius: 8px;
      animation: active-menu-item 0.3s linear;
    }
    span {
      position: absolute;
    }
  }

  .kk-single-menu.is-active {
    color: #fff;
    &::before {
      content: '';
      position: absolute;
      left: 10px;
      top: 5px;
      right: 10px;
      bottom: 5px;
      background-color: var(--el-color-primary);
      border-radius: 8px;
      animation: active-menu 0.3s ease;
    }
    &::after {
      content: '';
      position: absolute;
      width: 3px;
      top: 5px;
      left: 0;
      bottom: 5px;
      background-color: var(--el-color-primary);
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    span {
      position: relative;
    }
  }
}
@keyframes active-menu-item {
  0% {
    background-color: transparent;
  }
}
@keyframes active-menu {
  0% {
    transform: scaleY(0.8);
  }
}
</style>
