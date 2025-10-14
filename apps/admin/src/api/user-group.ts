import request from '@/utils/request'

export function getUserGroupList(params?: any) {
  return request({
    url: '/user-group',
    method: 'get',
    params,
  })
}

export function getUserGroup(id: number) {
  return request({
    url: `/user-group/${id}`,
    method: 'get',
  })
}

export function createUserGroup(data: any) {
  return request({
    url: '/user-group',
    method: 'post',
    data,
  })
}

export function updateUserGroup(id: number, data: any) {
  return request({
    url: `/user-group/${id}`,
    method: 'put',
    data,
  })
}

export function deleteUserGroup(id: number) {
  return request({
    url: `/user-group/${id}`,
    method: 'delete',
  })
}

