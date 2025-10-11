// 用户状态管理

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, LoginForm } from '@kk/shared'
import { login, getUserInfo, logout } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>(getToken() || '')
    const userInfo = ref<User | null>(null)
    const permissions = ref<string[]>([])

    /**
     * 登录
     */
    async function loginAction(loginForm: LoginForm) {
      try {
        const data = await login(loginForm)
        token.value = data.token
        setToken(data.token)
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    }

    /**
     * 获取用户信息
     */
    async function getUserInfoAction() {
      try {
        const data = await getUserInfo()
        userInfo.value = data
        permissions.value = data.permissions || []
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    }

    /**
     * 退出登录
     */
    async function logoutAction() {
      try {
        await logout()
      } finally {
        token.value = ''
        userInfo.value = null
        permissions.value = []
        removeToken()
      }
    }

    /**
     * 重置状态
     */
    function resetState() {
      token.value = ''
      userInfo.value = null
      permissions.value = []
      removeToken()
    }

    return {
      token,
      userInfo,
      permissions,
      loginAction,
      getUserInfoAction,
      logoutAction,
      resetState
    }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)

