// 角色相关类型

import { PageQuery } from './common'

// 角色信息
export interface Role {
  roleId: number
  roleName: string
  roleKey: string
  roleSort: number
  status: number // 0:禁用 1:正常
  menuIds?: number[]
  remark?: string
  createTime?: string
  updateTime?: string
}

// 角色查询参数
export interface RoleQuery extends PageQuery {
  roleName?: string
  roleKey?: string
  status?: number
}

// 角色表单
export interface RoleForm {
  roleId?: number
  roleName: string
  roleKey: string
  roleSort: number
  status: number
  menuIds: number[]
  remark?: string
}

