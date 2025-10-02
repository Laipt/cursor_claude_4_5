// 菜单相关类型

// 菜单类型
export enum MenuType {
  DIRECTORY = 'M', // 目录
  MENU = 'C',      // 菜单
  BUTTON = 'F'     // 按钮
}

// 菜单信息
export interface Menu {
  menuId: number
  menuName: string
  parentId: number
  orderNum: number
  path?: string
  component?: string
  menuType: MenuType
  visible: number // 0:隐藏 1:显示
  status: number  // 0:禁用 1:正常
  perms?: string  // 权限标识
  icon?: string
  remark?: string
  children?: Menu[]
  createTime?: string
  updateTime?: string
}

// 菜单表单
export interface MenuForm {
  menuId?: number
  menuName: string
  parentId: number
  orderNum: number
  path?: string
  component?: string
  menuType: MenuType
  visible: number
  status: number
  perms?: string
  icon?: string
  remark?: string
}

// 菜单树
export interface MenuTree extends Menu {
  children?: MenuTree[]
}

// 路由元信息
export interface RouteMeta {
  title: string
  icon?: string
  hidden?: boolean
  keepAlive?: boolean
  permissions?: string[]
}

