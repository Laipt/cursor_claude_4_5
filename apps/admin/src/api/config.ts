// 配置API

import request from '@/utils/request'
import type { Config, ConfigQuery, ConfigForm, PageResult } from '@kk/shared'
import { toastSuccess } from './common'

/**
 * 配置列表
 */
export function getConfigList(params: ConfigQuery): Promise<PageResult<Config>> {
  return request({
    url: '/config/list',
    method: 'get',
    params,
  })
}

/**
 * 获取配置详情
 */
export function getConfig(configId: number): Promise<Config> {
  return request({
    url: `/config/${configId}`,
    method: 'get',
  })
}

/**
 * 新增配置
 */
export function addConfig(data: ConfigForm): Promise<Config> {
  return request({
    url: '/config',
    method: 'post',
    data,
  })
}

/**
 * 更新配置
 */
export function updateConfig({ configId, ...data }: ConfigForm): Promise<Config> {
  return (
    configId
      ? request({
          url: `/config/${configId}`,
          method: 'put',
          data,
        })
      : addConfig(data)
  ).then(toastSuccess)
}

/**
 * 删除配置
 */
export function deleteConfig(configId: number): Promise<void> {
  return request({
    url: `/config/${configId}`,
    method: 'delete',
  })
}
