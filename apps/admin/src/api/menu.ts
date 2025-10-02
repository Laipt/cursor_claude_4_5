// 菜单API

import request from '@/utils/request'
import { Menu, MenuForm, MenuTree } from '@/types/menu'

/**
 * 获取菜单树
 */
export function getMenuTree(): Promise<MenuTree[]> {
  return request({
    url: '/menu/tree',
    method: 'get'
  })
}

/**
 * 获取菜单列表
 */
export function getMenuList(): Promise<Menu[]> {
  return request({
    url: '/menu/list',
    method: 'get'
  })
}

/**
 * 获取菜单详情
 */
export function getMenu(menuId: number): Promise<Menu> {
  return request({
    url: `/menu/${menuId}`,
    method: 'get'
  })
}

/**
 * 新增菜单
 */
export function addMenu(data: MenuForm): Promise<Menu> {
  return request({
    url: '/menu',
    method: 'post',
    data
  })
}

/**
 * 更新菜单
 */
export function updateMenu(menuId: number, data: MenuForm): Promise<Menu> {
  return request({
    url: `/menu/${menuId}`,
    method: 'put',
    data
  })
}

/**
 * 删除菜单
 */
export function deleteMenu(menuId: number): Promise<void> {
  return request({
    url: `/menu/${menuId}`,
    method: 'delete'
  })
}

