// 角色相关 API handlers

import { http, HttpResponse } from 'msw'
import { roles } from '../data/roles'

const baseURL = '/api'

export const roleHandlers = [
  // 获取角色列表（分页）
  http.get(`${baseURL}/role/list`, ({ request }) => {
    const url = new URL(request.url)
    const pageNum = Number(url.searchParams.get('pageNum')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    const start = (pageNum - 1) * pageSize
    const end = start + pageSize
    const list = roles.slice(start, end)

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: {
        list,
        total: roles.length,
        pageNum,
        pageSize
      }
    })
  }),

  // 获取所有角色（不分页）
  http.get(`${baseURL}/role/all`, () => {
    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: roles
    })
  }),

  // 获取角色详情
  http.get(`${baseURL}/role/:id`, ({ params }) => {
    const roleId = Number(params.id)
    const role = roles.find(r => r.roleId === roleId)

    if (role) {
      return HttpResponse.json({
        code: 200,
        message: '成功',
        data: role
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '角色不存在',
      data: null
    }, { status: 404 })
  }),

  // 新增角色
  http.post(`${baseURL}/role`, async ({ request }) => {
    const body = await request.json() as any
    const newRole = {
      ...body,
      roleId: roles.length + 1,
      createTime: new Date().toISOString()
    }
    roles.push(newRole)

    return HttpResponse.json({
      code: 200,
      message: '新增成功',
      data: newRole
    })
  }),

  // 更新角色
  http.put(`${baseURL}/role/:id`, async ({ params, request }) => {
    const roleId = Number(params.id)
    const body = await request.json() as any
    const index = roles.findIndex(r => r.roleId === roleId)

    if (index !== -1) {
      roles[index] = { ...roles[index], ...body, updateTime: new Date().toISOString() }
      return HttpResponse.json({
        code: 200,
        message: '更新成功',
        data: roles[index]
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '角色不存在',
      data: null
    }, { status: 404 })
  }),

  // 删除角色
  http.delete(`${baseURL}/role/:id`, ({ params }) => {
    const roleId = Number(params.id)
    const index = roles.findIndex(r => r.roleId === roleId)

    if (index !== -1) {
      roles.splice(index, 1)
      return HttpResponse.json({
        code: 200,
        message: '删除成功',
        data: null
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '角色不存在',
      data: null
    }, { status: 404 })
  })
]

