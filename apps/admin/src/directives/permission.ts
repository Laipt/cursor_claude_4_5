// 权限指令

import { Directive, DirectiveBinding } from 'vue'
import { hasPermission } from '@/utils/permission'

/**
 * 权限指令
 * 使用方法: v-permission="['system:user:add']"
 */
export const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding

    if (value && value instanceof Array && value.length > 0) {
      const permissions = value

      const hasAuth = hasPermission(permissions)

      if (!hasAuth) {
        // 没有权限，移除元素
        el.parentNode?.removeChild(el)
      }
    } else {
      throw new Error('需要指定权限数组，例如 v-permission="[\'system:user:add\']"')
    }
  }
}

export default permission

