// 路由守卫

import { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { useAppStore } from '@/stores/app'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    const appStore = useAppStore()
    const hasToken = getToken()

    if (hasToken) {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        try {
          // 检查是否已获取用户信息
          const hasUserInfo = userStore.userInfo && userStore.userInfo.userId
          
          // 如果没有用户信息，先获取
          if (!hasUserInfo) {
            await userStore.getUserInfoAction()
          }

          // 检查是否已生成动态路由
          if (!permissionStore.isRoutesGenerated) {
            const accessRoutes = await permissionStore.generateRoutes()

            // 直接添加动态路由
            accessRoutes.forEach(route => {
              router.addRoute(route)
            })

            // 重定向到原目标路由，确保新添加的路由生效
            // 使用 path 而不是展开 to 对象，避免路由解析问题
            next({ path: to.fullPath, replace: true, query: to.query, hash: to.hash })
          } else {
            // 路由已生成，添加到标签页并继续
            appStore.addTagView(to)
            next()
          }
        } catch (error) {
          // 获取用户信息失败，重置token并跳转到登录页
          console.error('路由守卫错误:', error)
          userStore.resetState()
          permissionStore.resetState()
          appStore.resetState()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    } else {
      // 无token
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })

  router.onError(() => {
    NProgress.done()
  })
}

