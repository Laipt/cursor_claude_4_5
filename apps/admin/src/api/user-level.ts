import request from '@/utils/request'

export function getUserLevelList(params?: any) {
  return request({
    url: '/user-level',
    method: 'get',
    params,
  })
}

export function getUserLevel(id: number) {
  return request({
    url: `/user-level/${id}`,
    method: 'get',
  })
}

export function createUserLevel(data: any) {
  return request({
    url: '/user-level',
    method: 'post',
    data,
  })
}

export function updateUserLevel(id: number, data: any) {
  return request({
    url: `/user-level/${id}`,
    method: 'put',
    data,
  })
}

export function deleteUserLevel(id: number) {
  return request({
    url: `/user-level/${id}`,
    method: 'delete',
  })
}

