// 认证工具函数

const TOKEN_KEY = 'admin-token'

/**
 * 获取Token
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 设置Token
 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 删除Token
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 清除所有认证信息
 */
export function clearAuth(): void {
  localStorage.clear()
  sessionStorage.clear()
}

