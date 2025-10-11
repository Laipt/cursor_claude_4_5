// 用户相关 API handlers

import { http, HttpResponse } from 'msw'
import { users } from '../data/users'

const baseURL = '/api'

export const userHandlers = [
  // 获取用户列表
  http.get(`${baseURL}/user/list`, ({ request }) => {
    const url = new URL(request.url)
    const pageNum = Number(url.searchParams.get('pageNum')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const username = url.searchParams.get('username') || ''
    const phone = url.searchParams.get('phone') || ''
    const status = url.searchParams.get('status')

    // 筛选数据
    let filteredUsers = [...users]
    if (username) {
      filteredUsers = filteredUsers.filter(u => u.username.includes(username))
    }
    if (phone) {
      filteredUsers = filteredUsers.filter(u => u.phone?.includes(phone))
    }
    if (status !== null && status !== undefined && status !== '') {
      filteredUsers = filteredUsers.filter(u => u.status === Number(status))
    }

    // 分页
    const start = (pageNum - 1) * pageSize
    const end = start + pageSize
    const list = filteredUsers.slice(start, end)

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: {
        list,
        total: filteredUsers.length,
        pageNum,
        pageSize
      }
    })
  }),

  // 获取用户详情
  http.get(`${baseURL}/user/:id`, ({ params }) => {
    const userId = Number(params.id)
    const user = users.find(u => u.userId === userId)

    if (user) {
      return HttpResponse.json({
        code: 200,
        message: '成功',
        data: user
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '用户不存在',
      data: null
    }, { status: 404 })
  }),

  // 新增用户
  http.post(`${baseURL}/user`, async ({ request }) => {
    const body = await request.json() as any
    const newUser = {
      ...body,
      userId: users.length + 1,
      createTime: new Date().toISOString()
    }
    users.push(newUser)

    return HttpResponse.json({
      code: 200,
      message: '新增成功',
      data: newUser
    })
  }),

  // 更新用户
  http.put(`${baseURL}/user/:id`, async ({ params, request }) => {
    const userId = Number(params.id)
    const body = await request.json() as any
    const index = users.findIndex(u => u.userId === userId)

    if (index !== -1) {
      users[index] = { ...users[index], ...body, updateTime: new Date().toISOString() }
      return HttpResponse.json({
        code: 200,
        message: '更新成功',
        data: users[index]
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '用户不存在',
      data: null
    }, { status: 404 })
  }),

  // 删除用户
  http.delete(`${baseURL}/user/:id`, ({ params }) => {
    const userId = Number(params.id)
    const index = users.findIndex(u => u.userId === userId)

    if (index !== -1) {
      users.splice(index, 1)
      return HttpResponse.json({
        code: 200,
        message: '删除成功',
        data: null
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '用户不存在',
      data: null
    }, { status: 404 })
  }),

  // 批量删除用户
  http.delete(`${baseURL}/user/batch`, async ({ request }) => {
    const body = await request.json() as { userIds: number[] }
    const { userIds } = body

    userIds.forEach(userId => {
      const index = users.findIndex(u => u.userId === userId)
      if (index !== -1) {
        users.splice(index, 1)
      }
    })

    return HttpResponse.json({
      code: 200,
      message: '批量删除成功',
      data: null
    })
  }),

  // 重置密码
  http.put(`${baseURL}/user/:id/password`, async ({ params, request }) => {
    const userId = Number(params.id)
    const body = await request.json() as { password: string }
    const user = users.find(u => u.userId === userId)

    if (user) {
      return HttpResponse.json({
        code: 200,
        message: '密码重置成功',
        data: null
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '用户不存在',
      data: null
    }, { status: 404 })
  }),

  // 更新个人资料
  http.put(`${baseURL}/user/profile`, async ({ request }) => {
    const body = await request.json() as any
    const token = request.headers.get('Authorization')
    
    // 模拟从 token 获取当前用户 ID (实际应该解析 JWT)
    // 这里假设是用户 1
    const currentUserId = 1
    const index = users.findIndex(u => u.userId === currentUserId)

    if (index !== -1) {
      users[index] = { 
        ...users[index], 
        ...body, 
        updateTime: new Date().toISOString() 
      }
      return HttpResponse.json({
        code: 200,
        message: '个人资料更新成功',
        data: users[index]
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '用户不存在',
      data: null
    }, { status: 404 })
  }),

  // 修改密码
  http.put(`${baseURL}/user/password`, async ({ request }) => {
    const body = await request.json() as { oldPassword: string, newPassword: string }
    const token = request.headers.get('Authorization')
    
    // 模拟从 token 获取当前用户 ID
    const currentUserId = 1
    const user = users.find(u => u.userId === currentUserId)

    if (user) {
      // 这里简化处理，实际应该验证 oldPassword
      return HttpResponse.json({
        code: 200,
        message: '密码修改成功',
        data: null
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '用户不存在',
      data: null
    }, { status: 404 })
  })
]

