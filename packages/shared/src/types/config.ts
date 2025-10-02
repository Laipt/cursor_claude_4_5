// 配置相关类型

import { PageQuery } from './common'

// 配置信息
export interface Config {
  configId: number
  configName: string
  configKey: string
  configValue: string
  configType: string // system:系统配置 business:业务配置
  remark?: string
  createTime?: string
  updateTime?: string
}

// 配置查询参数
export interface ConfigQuery extends PageQuery {
  configName?: string
  configKey?: string
  configType?: string
}

// 配置表单
export interface ConfigForm {
  configId?: number
  configName: string
  configKey: string
  configValue: string
  configType: string
  remark?: string
}

