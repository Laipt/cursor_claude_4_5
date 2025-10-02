// 配置API

import request from '@/utils/request'
import { Config, ConfigQuery, ConfigForm } from '@/types/config'
import { PageResult } from '@/types/common'

/**
 * 配置列表
 */
export function getConfigList(params: ConfigQuery): Promise<PageResult<Config>> {
  return request({
    url: '/config/list',
    method: 'get',
    params
  })
}

/**
 * 获取配置详情
 */
export function getConfig(configId: number): Promise<Config> {
  return request({
    url: `/config/${configId}`,
    method: 'get'
  })
}

/**
 * 新增配置
 */
export function addConfig(data: ConfigForm): Promise<Config> {
  return request({
    url: '/config',
    method: 'post',
    data
  })
}

/**
 * 更新配置
 */
export function updateConfig(configId: number, data: ConfigForm): Promise<Config> {
  return request({
    url: `/config/${configId}`,
    method: 'put',
    data
  })
}

/**
 * 删除配置
 */
export function deleteConfig(configId: number): Promise<void> {
  return request({
    url: `/config/${configId}`,
    method: 'delete'
  })
}

