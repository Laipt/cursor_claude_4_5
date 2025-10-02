// 菜单相关 API handlers

import { http, HttpResponse } from 'msw'
import { menus, buildMenuTree } from '../data/menus'

const baseURL = '/api'

export const menuHandlers = [
  // 获取菜单树
  http.get(`${baseURL}/menu/tree`, () => {
    const tree = buildMenuTree(0)
    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: tree
    })
  }),

  // 获取菜单列表
  http.get(`${baseURL}/menu/list`, () => {
    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: menus
    })
  }),

  // 获取菜单详情
  http.get(`${baseURL}/menu/:id`, ({ params }) => {
    const menuId = Number(params.id)
    const menu = menus.find(m => m.menuId === menuId)

    if (menu) {
      return HttpResponse.json({
        code: 200,
        message: '成功',
        data: menu
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '菜单不存在',
      data: null
    }, { status: 404 })
  }),

  // 新增菜单
  http.post(`${baseURL}/menu`, async ({ request }) => {
    const body = await request.json() as any
    const newMenu = {
      ...body,
      menuId: menus.length + 1,
      createTime: new Date().toISOString()
    }
    menus.push(newMenu)

    return HttpResponse.json({
      code: 200,
      message: '新增成功',
      data: newMenu
    })
  }),

  // 更新菜单
  http.put(`${baseURL}/menu/:id`, async ({ params, request }) => {
    const menuId = Number(params.id)
    const body = await request.json() as any
    const index = menus.findIndex(m => m.menuId === menuId)

    if (index !== -1) {
      menus[index] = { ...menus[index], ...body, updateTime: new Date().toISOString() }
      return HttpResponse.json({
        code: 200,
        message: '更新成功',
        data: menus[index]
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '菜单不存在',
      data: null
    }, { status: 404 })
  }),

  // 删除菜单
  http.delete(`${baseURL}/menu/:id`, ({ params }) => {
    const menuId = Number(params.id)
    const index = menus.findIndex(m => m.menuId === menuId)

    if (index !== -1) {
      menus.splice(index, 1)
      return HttpResponse.json({
        code: 200,
        message: '删除成功',
        data: null
      })
    }

    return HttpResponse.json({
      code: 404,
      message: '菜单不存在',
      data: null
    }, { status: 404 })
  })
]

