// 通用类型定义

// API响应结构
export interface Response<T = any> {
  code: number
  message: string
  data: T
}

// 分页结果
export interface PageResult<T = any> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}

// 分页查询参数
export interface PageQuery {
  pageNum: number
  pageSize: number
}

// 登录表单
export interface LoginForm {
  username: string
  password: string
  code?: string
}

// 登录响应
export interface LoginResult {
  token: string
}

// 选项类型
export interface Option {
  label: string
  value: string | number
}

// 树形节点
export interface TreeNode {
  id: number | string
  label: string
  children?: TreeNode[]
  [key: string]: any
}

