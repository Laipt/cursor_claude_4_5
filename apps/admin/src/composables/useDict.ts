// 字典使用组合式函数
import { ref, computed } from 'vue'
import { useDictStore } from '@/stores/dict'
import type { DictData } from '@admin-system/shared'
import { DictTypes } from '@admin-system/shared'

/**
 * 使用字典
 * @param dictType 字典类型
 */
export function useDict(dictType: string) {
  const dictStore = useDictStore()
  const dictData = ref<DictData[]>([])
  const loading = ref(false)

  // 加载字典数据
  const loadDict = async () => {
    loading.value = true
    try {
      dictData.value = await dictStore.getDictData(dictType)
    } finally {
      loading.value = false
    }
  }

  // 立即加载
  loadDict()

  // 获取字典标签
  const getLabel = (value: string | number) => {
    const item = dictData.value.find(d => d.dictValue === String(value))
    return item?.dictLabel || String(value)
  }

  // 获取Element Plus标签类型
  const getTagType = (value: string | number) => {
    const item = dictData.value.find(d => d.dictValue === String(value))
    return item?.listClass || 'info'
  }

  // 获取字典选项（用于下拉框等）
  const options = computed(() => {
    return dictData.value.map(d => ({
      label: d.dictLabel,
      value: d.dictValue,
      ...d
    }))
  })

  return {
    dictData,
    loading,
    loadDict,
    getLabel,
    getTagType,
    options
  }
}

/**
 * 批量使用字典
 */
export function useDicts() {
  const dictStore = useDictStore()

  // 获取标签
  const getLabel = async (dictType: string, value: string | number) => {
    return dictStore.getDictLabel(dictType, value)
  }

  // 获取标签类型
  const getTagType = async (dictType: string, value: string | number) => {
    return dictStore.getDictTagType(dictType, value)
  }

  // 获取字典数据
  const getDictData = (dictType: string) => {
    return dictStore.getDictData(dictType)
  }

  // 批量加载字典
  const loadDicts = (dictTypes: string[]) => {
    return dictStore.loadDicts(dictTypes)
  }

  return {
    getLabel,
    getTagType,
    getDictData,
    loadDicts,
    DictTypes, // 导出字典类型常量
  }
}

