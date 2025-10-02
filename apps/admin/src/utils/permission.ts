// 权限判断工具

import { useUserStore } from '@/stores/user'

/**
 * 检查是否有权限
 * @param permissions 权限标识数组
 */
export function hasPermission(permissions: string[]): boolean {
  const userStore = useUserStore()
  const userPermissions = userStore.permissions || []
  
  // 超级管理员拥有所有权限
  if (userPermissions.includes('*:*:*')) {
    return true
  }
  
  // 检查是否有任意一个权限
  return permissions.some(permission => userPermissions.includes(permission))
}

/**
 * 检查是否有所有权限
 * @param permissions 权限标识数组
 */
export function hasAllPermissions(permissions: string[]): boolean {
  const userStore = useUserStore()
  const userPermissions = userStore.permissions || []
  
  // 超级管理员拥有所有权限
  if (userPermissions.includes('*:*:*')) {
    return true
  }
  
  // 检查是否拥有所有权限
  return permissions.every(permission => userPermissions.includes(permission))
}

/**
 * 检查是否有角色
 * @param roles 角色标识数组
 */
export function hasRole(roles: string[]): boolean {
  const userStore = useUserStore()
  const userRoles = userStore.userInfo?.roles || []
  
  // 检查是否有任意一个角色
  return roles.some(role => userRoles.includes(role))
}

/**
 * 检查是否有所有角色
 * @param roles 角色标识数组
 */
export function hasAllRoles(roles: string[]): boolean {
  const userStore = useUserStore()
  const userRoles = userStore.userInfo?.roles || []
  
  // 检查是否拥有所有角色
  return roles.every(role => userRoles.includes(role))
}

