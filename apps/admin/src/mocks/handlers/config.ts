// 配置相关 API handlers

import { http, HttpResponse } from 'msw'
import { configs } from '../data/configs'

const baseURL = '/api'

export const configHandlers = [
  // 获取配置列表
  http.get(`${baseURL}/config/list`, ({ request }) => {
    const url = new URL(request.url)
    const pageNum = Number(url.searchParams.get('pageNum')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    const start = (pageNum - 1) * pageSize
    const end = start + pageSize
    const list = configs.slice(start, end)

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: {
        list,
        total: configs.length,
        pageNum,
        pageSize
      }
    })
  }),

  // 获取配置详情
  http.get(`${baseURL}/config/:id`, ({ params }) => {
    const configId = Number(params.id)
    const config = configs.find(c => c.configId === configId)

    if (config) {
      return HttpResponse.json({
        code: 200,
        message: '成功',
        data: config
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '配置不存在',
      data: null
    }, { status: 404 })
  }),

  // 新增配置
  http.post(`${baseURL}/config`, async ({ request }) => {
    const body = await request.json() as any
    const newConfig = {
      ...body,
      configId: configs.length + 1,
      createTime: new Date().toISOString()
    }
    configs.push(newConfig)

    return HttpResponse.json({
      code: 200,
      message: '新增成功',
      data: newConfig
    })
  }),

  // 更新配置
  http.put(`${baseURL}/config/:id`, async ({ params, request }) => {
    const configId = Number(params.id)
    const body = await request.json() as any
    const index = configs.findIndex(c => c.configId === configId)

    if (index !== -1) {
      configs[index] = { ...configs[index], ...body, updateTime: new Date().toISOString() }
      return HttpResponse.json({
        code: 200,
        message: '更新成功',
        data: configs[index]
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '配置不存在',
      data: null
    }, { status: 404 })
  }),

  // 删除配置
  http.delete(`${baseURL}/config/:id`, ({ params }) => {
    const configId = Number(params.id)
    const index = configs.findIndex(c => c.configId === configId)

    if (index !== -1) {
      configs.splice(index, 1)
      return HttpResponse.json({
        code: 200,
        message: '删除成功',
        data: null
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '配置不存在',
      data: null
    }, { status: 404 })
  })
]

