// 权限状态管理

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { type Menu, type MenuTree, MenuTypeValue, Visible } from '@kk/shared'
import { getMenuTree } from '@/api/menu'

// 使用 import.meta.glob 预加载所有视图组件
const modules = import.meta.glob('../views/**/*.vue')

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<any[]>([])
  const menus = ref<Menu[]>([])
  const permissions = ref<string[]>([])
  const isRoutesGenerated = ref(false)

  /**
   * 动态加载组件
   */
  function loadComponent(component: string) {
    // 移除开头的斜杠
    const cleanComponent = component?.startsWith('/') ? component.slice(1) : component
    const path = `../views/${cleanComponent}.vue`
    const module = modules[path]

    if (!module) {
      console.error(`组件不存在: ${path}`)
      return () => import('@/views/error/404.vue')
    }

    return module
  }

  /**
   * 生成路由
   */
  async function generateRoutes() {
    try {
      const menuTree = await getMenuTree()
      menus.value = generateMenusPath(menuTree, '')
      routes.value = generateRoutesFromMenus(menuTree)
      isRoutesGenerated.value = true
      return routes.value
    } catch (error) {
      return Promise.reject(error)
    }
  }

  function generateMenusPath(menus: MenuTree[], parentPath: string) {
    return menus.map((menu) => {
      if (menu.menuType === MenuTypeValue.BUTTON) return menu
      if (menu.path && !menu.path?.startsWith('/')) {
        menu.path = `${parentPath}/${menu.path}`
      }
      if (menu.children?.length) {
        menu.children = generateMenusPath(menu.children, menu.path ?? '')
      }
      return menu
    })
  }

  /**
   * 从菜单生成路由
   */
  function generateRoutesFromMenus(menus: Menu[], isChild: boolean = false): any[] {
    const routes: any[] = []

    const getComponentName = (menu: Menu) => {
      if (menu.component) {
        return menu.component.slice(1).replace('/', '_')
      } else {
        return menu.path?.slice(1).replace('/', '_') ?? ''
      }
    }

    menus.forEach((menu) => {
      // 只处理菜单类型，忽略按钮
      if (menu.menuType === MenuTypeValue.MENU || menu.menuType === MenuTypeValue.DIRECTORY) {
        // 如果是子路由，直接创建简单路由
        if (isChild) {
          // 子路由的路径需要去掉父路径前缀
          let childPath = menu.path || ''
          if (childPath.startsWith('/')) {
            // 提取最后一段作为子路径
            const segments = childPath.split('/').filter(Boolean)
            childPath = segments[segments.length - 1] || ''
          }

          const route: RouteRecordRaw = {
            path: childPath,
            name: getComponentName(menu),
            component: loadComponent(menu.component!),
            meta: {
              title: menu.menuName,
              icon: menu.icon,
              hidden: menu.visible === Visible.HIDDEN,
              permissions: menu.perms ? [menu.perms] : [],
            },
          }

          // 递归处理子菜单
          if (menu.children && menu.children.length > 0) {
            ;(route as any).children = generateRoutesFromMenus(menu.children, true)
          }

          routes.push(route)
        } else {
          // 顶级路由，包裹在 Layout 中
          if (menu.menuType === MenuTypeValue.DIRECTORY || menu.component === 'Layout') {
            // 目录类型，Layout + children
            const route: RouteRecordRaw = {
              path: menu.path || '',
              name: getComponentName(menu),
              component: () => import('@/layouts/Layout.vue'),
              meta: {
                title: menu.menuName,
                icon: menu.icon,
                hidden: menu.visible === Visible.HIDDEN,
                permissions: menu.perms ? [menu.perms] : [],
              },
            }

            // 递归处理子菜单
            if (menu.children && menu.children.length > 0) {
              ;(route as any).children = generateRoutesFromMenus(menu.children, true)
            }

            routes.push(route)
          } else {
            // 单页面，Layout + 单个子路由
            const route: RouteRecordRaw = {
              path: menu.path || '',
              component: () => import('@/layouts/Layout.vue'),
              children: [
                {
                  path: '',
                  name: getComponentName(menu),
                  component: loadComponent(menu.component!),
                  meta: {
                    title: menu.menuName,
                    icon: menu.icon,
                    hidden: menu.visible === Visible.HIDDEN,
                    permissions: menu.perms ? [menu.perms] : [],
                  },
                },
              ],
            }

            routes.push(route)
          }
        }
      }

      // 收集按钮权限
      if (menu.menuType === MenuTypeValue.BUTTON && menu.perms) {
        permissions.value.push(menu.perms)
      }
    })

    return routes
  }

  /**
   * 重置状态
   */
  function resetState() {
    routes.value = []
    menus.value = []
    permissions.value = []
    isRoutesGenerated.value = false
  }

  return {
    routes,
    menus,
    permissions,
    isRoutesGenerated,
    generateRoutes,
    resetState,
  }
})
