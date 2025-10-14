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
  
  // ==================== 电商模块字典 ====================
  /** App用户状态 */
  APP_USER_STATUS: 'app_user_status',
  /** 商品状态 */
  PRODUCT_STATUS: 'product_status',
  /** 订单状态 */
  ORDER_STATUS: 'order_status',
  /** 支付状态 */
  PAY_STATUS: 'pay_status',
  /** 发货状态 */
  DELIVERY_STATUS: 'delivery_status',
  /** 退款状态 */
  REFUND_STATUS: 'refund_status',
  /** 余额调整类型 */
  BALANCE_TYPE: 'balance_type',
  /** 余额调整操作 */
  BALANCE_ACTION: 'balance_action',
  /** 评论评分 */
  REPLY_SCORE: 'reply_score',
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

// ==================== 电商模块常量 ====================

/**
 * App用户状态
 */
export const AppUserStatus = {
  /** 禁用 */
  DISABLED: 0,
  /** 正常 */
  NORMAL: 1,
} as const

export type AppUserStatusValue = typeof AppUserStatus[keyof typeof AppUserStatus]

/**
 * 商品状态（上下架）
 */
export const ProductStatus = {
  /** 下架 */
  OFF_SHELF: 0,
  /** 上架 */
  ON_SHELF: 1,
} as const

export type ProductStatusValue = typeof ProductStatus[keyof typeof ProductStatus]

/**
 * 订单状态常量
 */
export const OrderStatusConst = {
  /** 待发货 */
  PENDING_DELIVERY: 0,
  /** 待收货 */
  PENDING_RECEIPT: 1,
  /** 待评价 */
  PENDING_REVIEW: 2,
  /** 已完成 */
  COMPLETED: 3,
  /** 已退款 */
  REFUNDED: -1,
} as const

export type OrderStatusConstValue = typeof OrderStatusConst[keyof typeof OrderStatusConst]

/**
 * 支付状态
 */
export const PayStatus = {
  /** 未支付 */
  UNPAID: 0,
  /** 已支付 */
  PAID: 1,
} as const

export type PayStatusValue = typeof PayStatus[keyof typeof PayStatus]

/**
 * 退款状态
 */
export const RefundStatus = {
  /** 无退款 */
  NONE: 0,
  /** 申请中 */
  APPLYING: 1,
  /** 已退款 */
  REFUNDED: 2,
  /** 已拒绝 */
  REJECTED: 3,
} as const

export type RefundStatusValue = typeof RefundStatus[keyof typeof RefundStatus]

/**
 * 余额调整类型
 */
export const BalanceType = {
  /** 余额 */
  MONEY: 'money',
  /** 积分 */
  INTEGRAL: 'integral',
} as const

export type BalanceTypeValue = typeof BalanceType[keyof typeof BalanceType]

/**
 * 余额调整操作
 */
export const BalanceAction = {
  /** 增加 */
  ADD: 'add',
  /** 减少 */
  SUBTRACT: 'subtract',
} as const

export type BalanceActionValue = typeof BalanceAction[keyof typeof BalanceAction]

/**
 * 发货类型
 */
export const DeliveryType = {
  /** 快递 */
  EXPRESS: 'express',
  /** 送货上门 */
  HOME_DELIVERY: 'home',
  /** 到店自提 */
  SELF_PICKUP: 'pickup',
} as const

export type DeliveryTypeValue = typeof DeliveryType[keyof typeof DeliveryType]

