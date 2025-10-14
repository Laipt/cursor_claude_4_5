import request from '@/utils/request'

export function getUserTagList(params?: any) {
  return request({
    url: '/user-tag',
    method: 'get',
    params,
  })
}

export function getUserTag(id: number) {
  return request({
    url: `/user-tag/${id}`,
    method: 'get',
  })
}

export function createUserTag(data: any) {
  return request({
    url: '/user-tag',
    method: 'post',
    data,
  })
}

export function updateUserTag(id: number, data: any) {
  return request({
    url: `/user-tag/${id}`,
    method: 'put',
    data,
  })
}

export function deleteUserTag(id: number) {
  return request({
    url: `/user-tag/${id}`,
    method: 'delete',
  })
}

