// 认证相关 API handlers

import { http, HttpResponse } from 'msw'
import { users } from '../data/users'

const baseURL = '/api'

export const authHandlers = [
  // 登录
  http.post(`${baseURL}/auth/login`, async ({ request }) => {
    const body = await request.json() as { username: string; password: string }
    const { username, password } = body

    // 验证用户
    if (username === 'admin' && password === 'admin123') {
      return HttpResponse.json({
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock-token-admin-' + Date.now()
        }
      })
    } else if (username === 'user' && password === 'user123') {
      return HttpResponse.json({
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock-token-user-' + Date.now()
        }
      })
    } else {
      return HttpResponse.json({
        code: 401,
        message: '用户名或密码错误',
        data: null
      }, { status: 401 })
    }
  }),

  // 获取用户信息
  http.get(`${baseURL}/auth/userinfo`, ({ request }) => {
    const token = request.headers.get('authorization') || ''

    if (token.includes('admin')) {
      return HttpResponse.json({
        code: 200,
        message: '成功',
        data: users[0]
      })
    } else if (token.includes('user')) {
      return HttpResponse.json({
        code: 200,
        message: '成功',
        data: users[1]
      })
    } else {
      return HttpResponse.json({
        code: 401,
        message: '未授权',
        data: null
      }, { status: 401 })
    }
  }),

  // 退出登录
  http.post(`${baseURL}/auth/logout`, () => {
    return HttpResponse.json({
      code: 200,
      message: '退出成功',
      data: null
    })
  })
]

