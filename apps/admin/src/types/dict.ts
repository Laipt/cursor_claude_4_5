// 字典相关类型

import { PageQuery } from './common'

// 字典类型
export interface Dict {
  dictId: number
  dictName: string
  dictType: string
  status: number // 0:禁用 1:正常
  remark?: string
  createTime?: string
  updateTime?: string
}

// 字典查询参数
export interface DictQuery extends PageQuery {
  dictName?: string
  dictType?: string
  status?: number
}

// 字典表单
export interface DictForm {
  dictId?: number
  dictName: string
  dictType: string
  status: number
  remark?: string
}

// 字典数据
export interface DictData {
  dictCode: number
  dictSort: number
  dictLabel: string
  dictValue: string
  dictType: string
  cssClass?: string
  listClass?: string
  isDefault: number // 0:否 1:是
  status: number     // 0:禁用 1:正常
  remark?: string
  createTime?: string
  updateTime?: string
}

// 字典数据查询参数
export interface DictDataQuery extends PageQuery {
  dictType: string
  dictLabel?: string
  status?: number
}

// 字典数据表单
export interface DictDataForm {
  dictCode?: number
  dictSort: number
  dictLabel: string
  dictValue: string
  dictType: string
  cssClass?: string
  listClass?: string
  isDefault: number
  status: number
  remark?: string
}

