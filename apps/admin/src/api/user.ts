// 用户API

import request from '@/utils/request'
import type { User, UserQuery, UserForm, PageResult, ProfileForm, ChangePasswordForm } from '@kk/shared'
import { toastSuccess } from './common'

/**
 * 用户列表
 */
export function getUserList(params: UserQuery): Promise<PageResult<User>> {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  })
}

/**
 * 获取用户详情
 */
export function getUser(userId: number): Promise<User> {
  return request({
    url: `/user/${userId}`,
    method: 'get',
  })
}

/**
 * 新增用户
 */
export function addUser(data: UserForm): Promise<User> {
  return request({
    url: '/user',
    method: 'post',
    data,
  })
}

/**
 * 更新用户
 */
export function updateUser(params: UserForm): Promise<User> {
  const { userId, ...data } = params
  return (
    userId
      ? request({
          url: `/user/${userId}`,
          method: 'put',
          data,
        })
      : addUser(params)
  ).then(toastSuccess)
}

/**
 * 删除用户
 */
export function deleteUser(userId: number): Promise<void> {
  return request({
    url: `/user/${userId}`,
    method: 'delete',
  }).then(toastSuccess)
}

/**
 * 批量删除用户
 */
export function batchDeleteUser(userIds: number[]): Promise<void> {
  return request({
    url: '/user/batch',
    method: 'delete',
    data: { userIds },
  })
}

/**
 * 重置密码
 */
export function resetPassword(userId: number, password: string): Promise<void> {
  return request({
    url: `/user/${userId}/password`,
    method: 'put',
    data: { password },
  }).then(toastSuccess)
}

/**
 * 更新个人资料
 */
export function updateProfile(data: ProfileForm): Promise<User> {
  return request({
    url: '/user/profile',
    method: 'put',
    data,
  }).then(toastSuccess)
}

/**
 * 修改密码
 */
export function changePassword(data: ChangePasswordForm): Promise<void> {
  return request({
    url: '/user/password',
    method: 'put',
    data,
  }).then(toastSuccess)
}
