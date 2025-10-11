// 字典API

import request from '@/utils/request'
import type { Dict, DictQuery, DictForm, DictData, DictDataQuery, DictDataForm, PageResult } from '@kk/shared'
import { toastSuccess } from './common'

/**
 * 字典类型列表
 */
export function getDictList(params: DictQuery): Promise<PageResult<Dict>> {
  return request({
    url: '/dict/list',
    method: 'get',
    params,
  })
}

/**
 * 字典数据列表
 */
export function getDictDataList(params: DictDataQuery): Promise<PageResult<DictData>> {
  return request({
    url: '/dict/data/list',
    method: 'get',
    params,
  })
}

/**
 * 新增字典类型
 */
export function addDict(data: DictForm): Promise<Dict> {
  return request({
    url: '/dict',
    method: 'post',
    data,
  })
}

/**
 * 新增字典数据
 */
export function addDictData(data: DictDataForm): Promise<DictData> {
  return request({
    url: '/dict/data',
    method: 'post',
    data,
  })
}

/**
 * 更新字典类型
 */
export function updateDict({ dictId, ...data }: DictForm): Promise<Dict> {
  return (
    dictId
      ? request({
          url: `/dict/${dictId}`,
          method: 'put',
          data,
        })
      : addDict(data)
  ).then(toastSuccess)
}

/**
 * 更新字典数据
 */
export function updateDictData({ dictCode, ...data }: DictDataForm): Promise<DictData> {
  return (
    dictCode
      ? request({
          url: `/dict/data/${dictCode}`,
          method: 'put',
          data,
        })
      : addDictData(data)
  ).then(toastSuccess)
}

/**
 * 删除字典类型
 */
export function deleteDict(dictId: number): Promise<void> {
  return request({
    url: `/dict/${dictId}`,
    method: 'delete',
  })
}

/**
 * 删除字典数据
 */
export function deleteDictData(dictCode: number): Promise<void> {
  return request({
    url: `/dict/data/${dictCode}`,
    method: 'delete',
  })
}

/**
 * 根据字典类型获取字典数据（用于下拉选项等）
 */
export function getDictDataByType(dictType: string): Promise<DictData[]> {
  return request({
    url: `/dict/data/type/${dictType}`,
    method: 'get',
  })
}
