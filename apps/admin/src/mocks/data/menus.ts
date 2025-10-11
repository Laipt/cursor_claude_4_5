// 菜单 Mock 数据

import type { Menu, MenuType } from '@kk/shared'

export const menus: Menu[] = [
  // 首页
  {
    menuId: 1,
    menuName: '首页',
    parentId: 0,
    orderNum: 1,
    path: '/home',
    component: 'home/index',
    menuType: 'C' as MenuType,
    visible: 1,
    status: 1,
    perms: 'home:view',
    icon: 'House',
    createTime: '2024-01-01 00:00:00'
  },
  // 系统管理
  {
    menuId: 2,
    menuName: '系统管理',
    parentId: 0,
    orderNum: 2,
    path: '/system',
    component: 'Layout',
    menuType: 'M' as MenuType,
    visible: 1,
    status: 1,
    icon: 'Setting',
    createTime: '2024-01-01 00:00:00'
  },
  // 用户管理
  {
    menuId: 3,
    menuName: '用户管理',
    parentId: 2,
    orderNum: 1,
    path: '/system/user',
    component: 'system/user/index',
    menuType: 'C' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:user:list',
    icon: 'User',
    createTime: '2024-01-01 00:00:00'
  },
  {
    menuId: 4,
    menuName: '用户新增',
    parentId: 3,
    orderNum: 1,
    menuType: 'F' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:user:add',
    createTime: '2024-01-01 00:00:00'
  },
  {
    menuId: 5,
    menuName: '用户编辑',
    parentId: 3,
    orderNum: 2,
    menuType: 'F' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:user:edit',
    createTime: '2024-01-01 00:00:00'
  },
  {
    menuId: 6,
    menuName: '用户删除',
    parentId: 3,
    orderNum: 3,
    menuType: 'F' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:user:delete',
    createTime: '2024-01-01 00:00:00'
  },
  // 角色管理
  {
    menuId: 7,
    menuName: '角色管理',
    parentId: 2,
    orderNum: 2,
    path: '/system/role',
    component: 'system/role/index',
    menuType: 'C' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:role:list',
    icon: 'UserFilled',
    createTime: '2024-01-01 00:00:00'
  },
  {
    menuId: 8,
    menuName: '角色新增',
    parentId: 7,
    orderNum: 1,
    menuType: 'F' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:role:add',
    createTime: '2024-01-01 00:00:00'
  },
  {
    menuId: 9,
    menuName: '角色编辑',
    parentId: 7,
    orderNum: 2,
    menuType: 'F' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:role:edit',
    createTime: '2024-01-01 00:00:00'
  },
  {
    menuId: 10,
    menuName: '角色删除',
    parentId: 7,
    orderNum: 3,
    menuType: 'F' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:role:delete',
    createTime: '2024-01-01 00:00:00'
  },
  // 菜单管理
  {
    menuId: 11,
    menuName: '菜单管理',
    parentId: 2,
    orderNum: 3,
    path: '/system/menu',
    component: 'system/menu/index',
    menuType: 'C' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:menu:list',
    icon: 'Menu',
    createTime: '2024-01-01 00:00:00'
  },
  {
    menuId: 12,
    menuName: '菜单新增',
    parentId: 11,
    orderNum: 1,
    menuType: 'F' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:menu:add',
    createTime: '2024-01-01 00:00:00'
  },
  {
    menuId: 13,
    menuName: '菜单编辑',
    parentId: 11,
    orderNum: 2,
    menuType: 'F' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:menu:edit',
    createTime: '2024-01-01 00:00:00'
  },
  {
    menuId: 14,
    menuName: '菜单删除',
    parentId: 11,
    orderNum: 3,
    menuType: 'F' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:menu:delete',
    createTime: '2024-01-01 00:00:00'
  },
  // 字典管理
  {
    menuId: 15,
    menuName: '字典管理',
    parentId: 2,
    orderNum: 4,
    path: '/system/dict',
    component: 'system/dict/index',
    menuType: 'C' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:dict:list',
    icon: 'Collection',
    createTime: '2024-01-01 00:00:00'
  },
  // 配置管理
  {
    menuId: 16,
    menuName: '配置管理',
    parentId: 2,
    orderNum: 5,
    path: '/system/config',
    component: 'system/config/index',
    menuType: 'C' as MenuType,
    visible: 1,
    status: 1,
    perms: 'system:config:list',
    icon: 'Tools',
    createTime: '2024-01-01 00:00:00'
  }
]

// 构建菜单树
export function buildMenuTree(parentId: number = 0): Menu[] {
  return menus
    .filter(menu => menu.parentId === parentId)
    .map(menu => ({
      ...menu,
      children: buildMenuTree(menu.menuId)
    }))
}

