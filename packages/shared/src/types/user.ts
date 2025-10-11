// 用户相关类型

import { PageQuery } from './common'

// 用户信息
export interface User {
  userId: number
  username: string
  nickname: string
  email?: string
  phone?: string
  avatar?: string
  status: number // 0:禁用 1:正常
  roleIds?: number[]
  roles?: string[]
  permissions?: string[]
  createTime?: string
  updateTime?: string
}

// 用户查询参数
export interface UserQuery extends PageQuery {
  username?: string
  phone?: string
  status?: number
}

// 用户表单
export interface UserForm {
  userId?: number
  username: string
  nickname: string
  email?: string
  phone?: string
  password?: string
  status: number
  roleIds: number[]
}

// 修改密码表单
export interface PasswordForm {
  userId: number
  oldPassword?: string
  newPassword: string
}

// 个人资料表单
export interface ProfileForm {
  nickname: string
  email?: string
  phone?: string
  avatar?: string
}

// 修改密码表单
export interface ChangePasswordForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

