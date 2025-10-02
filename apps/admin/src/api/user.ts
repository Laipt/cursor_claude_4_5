// 用户API

import request from '@/utils/request'
import { User, UserQuery, UserForm } from '@/types/user'
import { PageResult } from '@/types/common'

/**
 * 用户列表
 */
export function getUserList(params: UserQuery): Promise<PageResult<User>> {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

/**
 * 获取用户详情
 */
export function getUser(userId: number): Promise<User> {
  return request({
    url: `/user/${userId}`,
    method: 'get'
  })
}

/**
 * 新增用户
 */
export function addUser(data: UserForm): Promise<User> {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

/**
 * 更新用户
 */
export function updateUser(userId: number, data: UserForm): Promise<User> {
  return request({
    url: `/user/${userId}`,
    method: 'put',
    data
  })
}

/**
 * 删除用户
 */
export function deleteUser(userId: number): Promise<void> {
  return request({
    url: `/user/${userId}`,
    method: 'delete'
  })
}

/**
 * 批量删除用户
 */
export function batchDeleteUser(userIds: number[]): Promise<void> {
  return request({
    url: '/user/batch',
    method: 'delete',
    data: { userIds }
  })
}

/**
 * 重置密码
 */
export function resetPassword(userId: number, password: string): Promise<void> {
  return request({
    url: `/user/${userId}/password`,
    method: 'put',
    data: { password }
  })
}

