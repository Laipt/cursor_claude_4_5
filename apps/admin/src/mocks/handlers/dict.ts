// 字典相关 API handlers

import { http, HttpResponse } from 'msw'
import { dicts, dictDataList } from '../data/dicts'

const baseURL = '/api'

export const dictHandlers = [
  // 获取字典类型列表
  http.get(`${baseURL}/dict/list`, ({ request }) => {
    const url = new URL(request.url)
    const pageNum = Number(url.searchParams.get('pageNum')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    const start = (pageNum - 1) * pageSize
    const end = start + pageSize
    const list = dicts.slice(start, end)

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: {
        list,
        total: dicts.length,
        pageNum,
        pageSize
      }
    })
  }),

  // 获取字典数据列表
  http.get(`${baseURL}/dict/data/list`, ({ request }) => {
    const url = new URL(request.url)
    const dictType = url.searchParams.get('dictType')
    const pageNum = Number(url.searchParams.get('pageNum')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    let filteredData = [...dictDataList]
    if (dictType) {
      filteredData = filteredData.filter(item => item.dictType === dictType)
    }

    const start = (pageNum - 1) * pageSize
    const end = start + pageSize
    const list = filteredData.slice(start, end)

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: {
        list,
        total: filteredData.length,
        pageNum,
        pageSize
      }
    })
  }),

  // 新增字典类型
  http.post(`${baseURL}/dict`, async ({ request }) => {
    const body = await request.json() as any
    const newDict = {
      ...body,
      dictId: dicts.length + 1,
      createTime: new Date().toISOString()
    }
    dicts.push(newDict)

    return HttpResponse.json({
      code: 200,
      message: '新增成功',
      data: newDict
    })
  }),

  // 新增字典数据
  http.post(`${baseURL}/dict/data`, async ({ request }) => {
    const body = await request.json() as any
    const newDictData = {
      ...body,
      dictCode: dictDataList.length + 1,
      createTime: new Date().toISOString()
    }
    dictDataList.push(newDictData)

    return HttpResponse.json({
      code: 200,
      message: '新增成功',
      data: newDictData
    })
  }),

  // 更新字典类型
  http.put(`${baseURL}/dict/:id`, async ({ params, request }) => {
    const dictId = Number(params.id)
    const body = await request.json() as any
    const index = dicts.findIndex(d => d.dictId === dictId)

    if (index !== -1) {
      dicts[index] = { ...dicts[index], ...body, updateTime: new Date().toISOString() }
      return HttpResponse.json({
        code: 200,
        message: '更新成功',
        data: dicts[index]
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '字典不存在',
      data: null
    }, { status: 404 })
  }),

  // 更新字典数据
  http.put(`${baseURL}/dict/data/:id`, async ({ params, request }) => {
    const dictCode = Number(params.id)
    const body = await request.json() as any
    const index = dictDataList.findIndex(d => d.dictCode === dictCode)

    if (index !== -1) {
      dictDataList[index] = { ...dictDataList[index], ...body, updateTime: new Date().toISOString() }
      return HttpResponse.json({
        code: 200,
        message: '更新成功',
        data: dictDataList[index]
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '字典数据不存在',
      data: null
    }, { status: 404 })
  }),

  // 删除字典类型
  http.delete(`${baseURL}/dict/:id`, ({ params }) => {
    const dictId = Number(params.id)
    const index = dicts.findIndex(d => d.dictId === dictId)

    if (index !== -1) {
      dicts.splice(index, 1)
      return HttpResponse.json({
        code: 200,
        message: '删除成功',
        data: null
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '字典不存在',
      data: null
    }, { status: 404 })
  }),

  // 删除字典数据
  http.delete(`${baseURL}/dict/data/:id`, ({ params }) => {
    const dictCode = Number(params.id)
    const index = dictDataList.findIndex(d => d.dictCode === dictCode)

    if (index !== -1) {
      dictDataList.splice(index, 1)
      return HttpResponse.json({
        code: 200,
        message: '删除成功',
        data: null
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '字典数据不存在',
      data: null
    }, { status: 404 })
  })
]

