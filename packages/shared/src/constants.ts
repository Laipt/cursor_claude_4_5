// 系统常量定义

/**
 * 状态常量 - 通用状态（用户、角色、菜单、字典等）
 */
export const Status = {
  /** 禁用 */
  DISABLED: 0,
  /** 正常 */
  NORMAL: 1,
} as const

export type StatusValue = typeof Status[keyof typeof Status]

/**
 * 菜单类型常量
 */
export const MenuTypeValue = {
  /** 目录 */
  DIRECTORY: 'M',
  /** 菜单 */
  MENU: 'C',
  /** 按钮 */
  BUTTON: 'F',
} as const

export type MenuTypeValueType = typeof MenuTypeValue[keyof typeof MenuTypeValue]

/**
 * 菜单可见性常量
 */
export const Visible = {
  /** 隐藏 */
  HIDDEN: 0,
  /** 显示 */
  VISIBLE: 1,
} as const

export type VisibleValue = typeof Visible[keyof typeof Visible]

/**
 * 是否默认
 */
export const IsDefault = {
  /** 否 */
  NO: 0,
  /** 是 */
  YES: 1,
} as const

export type IsDefaultValue = typeof IsDefault[keyof typeof IsDefault]

/**
 * 配置类型常量
 */
export const ConfigType = {
  /** 系统配置 */
  SYSTEM: 'system',
  /** 业务配置 */
  BUSINESS: 'business',
} as const

export type ConfigTypeValue = typeof ConfigType[keyof typeof ConfigType]

/**
 * 字典状态类型
 */
export const DictStatus = {
  /** 禁用 */
  DISABLED: 0,
  /** 正常 */
  NORMAL: 1,
} as const

/**
 * 常用字典类型定义
 */
export const DictTypes = {
  /** 用户状态 */
  USER_STATUS: 'sys_user_status',
  /** 菜单状态 */
  MENU_STATUS: 'sys_menu_status',
  /** 角色状态 */
  ROLE_STATUS: 'sys_role_status',
  /** 字典状态 */
  DICT_STATUS: 'sys_dict_status',
  /** 菜单类型 */
  MENU_TYPE: 'sys_menu_type',
  /** 是否显示 */
  SHOW_HIDE: 'sys_show_hide',
  /** 是否 */
  YES_NO: 'sys_yes_no',
  /** 菜单可见性 */
  MENU_VISIBLE: 'sys_menu_visible',
} as const

/**
 * HTTP 状态码
 */
export const HttpStatus = {
  /** 成功 */
  OK: 200,
  /** 已创建 */
  CREATED: 201,
  /** 无内容 */
  NO_CONTENT: 204,
  /** 错误请求 */
  BAD_REQUEST: 400,
  /** 未授权 */
  UNAUTHORIZED: 401,
  /** 禁止访问 */
  FORBIDDEN: 403,
  /** 未找到 */
  NOT_FOUND: 404,
  /** 服务器错误 */
  INTERNAL_SERVER_ERROR: 500,
} as const

/**
 * 工具函数：检查状态是否正常
 */
export const isNormalStatus = (status: number): boolean => {
  return status === Status.NORMAL
}

/**
 * 工具函数：检查是否可见
 */
export const isVisible = (visible: number): boolean => {
  return visible === Visible.VISIBLE
}

