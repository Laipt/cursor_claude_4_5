// 认证API

import request from '@/utils/request'
import { LoginForm, LoginResult } from '@/types/common'
import { User } from '@/types/user'

/**
 * 登录
 */
export function login(data: LoginForm): Promise<LoginResult> {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo(): Promise<User> {
  return request({
    url: '/auth/userinfo',
    method: 'get'
  })
}

/**
 * 退出登录
 */
export function logout(): Promise<void> {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

