import request from '@/utils/request'
import type { AppUserListResponse, QueryAppUserDto, UpdateAppUserDto, AdjustBalanceDto } from '@kk/shared'

// 获取用户列表
export const getAppUserList = (params: QueryAppUserDto) => {
  return request.get<AppUserListResponse>('/admin/app-user/list', { params })
}

// 获取用户详情
export const getAppUserDetail = (id: number) => {
  return request.get(`/admin/app-user/${id}`)
}

// 更新用户信息
export const updateAppUser = (id: number, data: UpdateAppUserDto) => {
  return request.put(`/admin/app-user/${id}`, data)
}

// 更新用户状态
export const updateAppUserStatus = (id: number, status: number) => {
  return request.put(`/admin/app-user/${id}/status`, { status })
}

// 调整余额/积分
export const adjustBalance = (data: AdjustBalanceDto) => {
  return request.post('/admin/app-user/adjust-balance', data)
}

// 获取标签列表
export const getUserTags = () => {
  return request.get('/admin/app-user/tags/list')
}

// 获取分组列表
export const getUserGroups = () => {
  return request.get('/admin/app-user/groups/list')
}

// 创建标签
export const createUserTag = (tagName: string) => {
  return request.post('/admin/app-user/tags', { tagName })
}

// 创建分组
export const createUserGroup = (groupName: string) => {
  return request.post('/admin/app-user/groups', { groupName })
}


