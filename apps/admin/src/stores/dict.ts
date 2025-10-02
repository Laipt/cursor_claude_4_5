// 字典数据管理
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DictData } from '@admin-system/shared'
import { getDictDataByType } from '@/api/dict'

export const useDictStore = defineStore('dict', () => {
  // 字典数据缓存
  const dictCache = ref<Map<string, DictData[]>>(new Map())
  // 加载状态缓存
  const loadingCache = ref<Map<string, boolean>>(new Map())

  /**
   * 获取字典数据
   * @param dictType 字典类型
   * @param forceRefresh 是否强制刷新
   */
  async function getDictData(dictType: string, forceRefresh = false): Promise<DictData[]> {
    // 如果已经有缓存且不强制刷新，直接返回
    if (!forceRefresh && dictCache.value.has(dictType)) {
      return dictCache.value.get(dictType)!
    }

    // 如果正在加载中，等待加载完成
    if (loadingCache.value.get(dictType)) {
      // 简单的轮询等待
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!loadingCache.value.get(dictType)) {
            clearInterval(interval)
            resolve(dictCache.value.get(dictType) || [])
          }
        }, 100)
      })
    }

    // 开始加载
    loadingCache.value.set(dictType, true)

    try {
      const data = await getDictDataByType(dictType)
      dictCache.value.set(dictType, data)
      return data
    } finally {
      loadingCache.value.set(dictType, false)
    }
  }

  /**
   * 根据字典值获取字典标签
   * @param dictType 字典类型
   * @param dictValue 字典值
   */
  async function getDictLabel(dictType: string, dictValue: string | number): Promise<string> {
    const data = await getDictData(dictType)
    const item = data.find(d => d.dictValue === String(dictValue))
    return item?.dictLabel || String(dictValue)
  }

  /**
   * 根据字典值获取标签类型（Element Plus）
   * @param dictType 字典类型
   * @param dictValue 字典值
   */
  async function getDictTagType(dictType: string, dictValue: string | number): Promise<string> {
    const data = await getDictData(dictType)
    const item = data.find(d => d.dictValue === String(dictValue))
    return item?.listClass || 'info'
  }

  /**
   * 清除指定类型的字典缓存
   * @param dictType 字典类型，不传则清除所有
   */
  function clearDictCache(dictType?: string) {
    if (dictType) {
      dictCache.value.delete(dictType)
    } else {
      dictCache.value.clear()
    }
  }

  /**
   * 刷新字典数据
   * @param dictType 字典类型
   */
  async function refreshDict(dictType: string) {
    return getDictData(dictType, true)
  }

  /**
   * 批量加载字典
   * @param dictTypes 字典类型列表
   */
  async function loadDicts(dictTypes: string[]) {
    await Promise.all(dictTypes.map(type => getDictData(type)))
  }

  return {
    dictCache,
    getDictData,
    getDictLabel,
    getDictTagType,
    clearDictCache,
    refreshDict,
    loadDicts,
  }
})

