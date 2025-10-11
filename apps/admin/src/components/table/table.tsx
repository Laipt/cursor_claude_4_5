import { resolveDirective, withDirectives, type SlotsType } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElButton, ElConfigProvider } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'

import { useForm } from '../form/index'
import useHeight from './hooks/useHeight'
import './style.scss'

export function useTable(service, options?: PaginationOptions) {
  const { model, KForm, reset } = useForm({ clearable: true })

  const tableRef = ref<InstanceType<typeof ElTable>>()

  const selectedRows = ref<any[]>([])

  const { data, current, pageSize, total, loading, params, run, refresh, changeCurrent, changePagination } =
    usePagination(service, options)

  const loadingDirective = resolveDirective('loading')

  function search(extraParams?) {
    tableRef.value?.clearSelection()
    const data = JSON.parse(JSON.stringify({ ...options?.params, ...model, ...extraParams }))
    run(data)
  }

  function reload(extraParams?) {
    current.value = 1
    search(extraParams)
  }

  const KTable = defineComponent({
    name: 'KTable',
    slots: Object as SlotsType<{
      default?: () => any
      query?: () => any
      actions?: () => any
    }>,
    props: {
      showIndex: {
        type: Boolean,
        default: true,
      },
      showSelection: {
        type: Boolean,
        default: false,
      },
      selectable: {
        type: Function as PropType<(row: any, index: number) => boolean>,
        default: null,
      },
      defaultCheckedRowKeys: {
        type: Function as PropType<(row: any, index: number) => boolean>,
        default: null,
      },
      diffHeight: {
        type: Number,
        default: 0,
      },
      pageSizes: {
        type: Array as PropType<number[]>,
        default: () => [10, 20, 30, 50],
      },
    },
    emits: ['selection-change'],
    setup(props, { attrs, slots, emit }) {
      // 扩展默认选中行为
      if (props.defaultCheckedRowKeys) {
        const defaultKeys: any[] = []
        watch(
          () => data.value,
          (val) => {
            const rowKey: any = tableRef.value?.rowKey
            val?.forEach((item: any, index: number) => {
              let rowValue
              if (typeof rowKey === 'string') {
                rowValue = item?.[rowKey]
              } else {
                rowValue = rowKey?.(item)
              }
              if (props.defaultCheckedRowKeys(item, index) && !defaultKeys?.includes(rowValue)) {
                defaultKeys.push(rowValue)
                tableRef.value?.toggleRowSelection(item, true)
              }
            })
          },
        )
      }

      function handleSelectionChange(rows: any) {
        selectedRows.value = rows
        emit('selection-change', rows)
      }

      function handleClearSelection() {
        tableRef.value?.clearSelection()
      }

      const { height, resetHeight } = useHeight(props.diffHeight)
      watch([total, selectedRows], () => {
        resetHeight()
      })

      return () => (
        <div>
          {slots.query && (
            <div class="kk-table-header">
              <KForm inline size="small">
                {slots.query?.()}
              </KForm>
              <ElButton type="primary" size="small" disabled={loading.value} icon={Search} onClick={() => search()}>
                搜索
              </ElButton>
              <ElButton
                plain
                size="small"
                disabled={loading.value}
                icon={Refresh}
                onClick={() => {
                  reset()
                  reload()
                }}
              >
                重置
              </ElButton>
            </div>
          )}

          {slots.actions && (
            <div class="kk-table-actions">
              <ElConfigProvider size="small">{slots.actions?.()}</ElConfigProvider>
            </div>
          )}

          {withDirectives(
            <ElTable
              headerCellStyle={{
                background: '#F8F9FB',
              }}
              maxHeight={height.value}
              {...attrs}
              ref={tableRef}
              data={data.value}
              onSelection-change={handleSelectionChange}
            >
              {props.showIndex && <ElTableColumn type="index" width={60} label="#"></ElTableColumn>}
              {props.showSelection && (
                <ElTableColumn
                  type="selection"
                  width={50}
                  reserveSelection
                  selectable={props.selectable}
                ></ElTableColumn>
              )}
              {slots.default?.()}
            </ElTable>,
            [[loadingDirective, loading.value]],
          )}

          <div class="kk-pagination">
            {selectedRows.value.length > 0 && (
              <div
                style={{
                  height: 'var(--el-pagination-height-extra-small)',
                  lineHeight: 'var(--el-pagination-line-height-extra-small)',
                  fontSize: 'var(--el-font-size-extra-small)',
                  color: 'var(--el-text-color-regular)',
                }}
              >
                {`已选 ${selectedRows.value.length} 条`}
                <ElButton
                  text
                  size="small"
                  type="primary"
                  style={{ display: 'inline-block' }}
                  onClick={handleClearSelection}
                >
                  清空
                </ElButton>
              </div>
            )}
            <ElPagination
              background
              size="small"
              hideOnSinglePage={total.value === 0}
              disabled={loading.value}
              pagerCount={5}
              layout="slot, total, sizes, prev, pager, next, jumper"
              total={total.value}
              currentPage={current.value}
              onUpdate:current-page={changeCurrent}
              pageSize={pageSize.value}
              onUpdate:page-size={(size) => changePagination({ current: 1, pageSize: size })}
              pageSizes={props.pageSizes}
              style={{
                justifyContent: 'right',
                position: 'relative',
              }}
            ></ElPagination>
          </div>
        </div>
      )
    },
  })

  return {
    queryForm: model,
    params,
    data,
    loading,
    selectedRows,
    refresh() {
      tableRef.value?.clearSelection()
      refresh()
    },
    reload,
    KTable,
  }
}

interface PaginationOptions {
  params?: Record<string, any>
  pageSize?: number
  current?: number
  manual?: boolean
}

export function usePagination<T>(service: (params: any) => Promise<any>, options: PaginationOptions = {}) {
  const response = ref<any>({})
  const data = ref<T[]>([])
  const loading = ref(false)
  const total = ref(0)
  const current = ref(options.current || 1)
  const pageSize = ref(options.pageSize || 10)
  const params = ref(options.params || {})
  const manual = options.manual

  // 核心请求方法
  const run = async (extraParams: Record<string, any> = {}) => {
    loading.value = true
    try {
      params.value = {
        ...params.value,
        [paginationConfig.requestFieldNames.current]: current.value,
        [paginationConfig.requestFieldNames.pageSize]: pageSize.value,
      }

      const res = await service({ ...params.value, ...extraParams })

      // 动态取 key
      response.value = res
      data.value = Array.isArray(res) ? res : res[paginationConfig.responseFieldNames.list] || []
      total.value = res[paginationConfig.responseFieldNames.total] || 0
    } finally {
      loading.value = false
    }
  }

  const refresh = () => run()

  const changeCurrent = (val: number) => {
    current.value = val
    run()
  }

  const changePagination = (pagination: { current?: number; pageSize?: number }) => {
    if (pagination.current !== undefined) current.value = pagination.current
    if (pagination.pageSize !== undefined) pageSize.value = pagination.pageSize
    run()
  }

  if (!manual) {
    run()
  }

  return {
    response,
    data,
    current,
    pageSize,
    total,
    loading,
    params,
    run,
    refresh,
    changeCurrent,
    changePagination,
  }
}

export interface PaginationFieldNames {
  current: string
  pageSize: string
}

export interface PaginationResponseFieldNames {
  list: string
  total: string
}

export const paginationConfig: {
  requestFieldNames: PaginationFieldNames
  responseFieldNames: PaginationResponseFieldNames
} = {
  requestFieldNames: {
    current: 'page',
    pageSize: 'pageSize',
  },
  responseFieldNames: {
    list: 'list',
    total: 'total',
  },
}

// 提供修改方法
export function setPaginationFieldNames(config: {
  requestFieldNames?: Partial<PaginationFieldNames>
  responseFieldNames?: Partial<PaginationResponseFieldNames>
}) {
  if (config.requestFieldNames) {
    paginationConfig.requestFieldNames = {
      ...paginationConfig.requestFieldNames,
      ...config.requestFieldNames,
    }
  }
  if (config.responseFieldNames) {
    paginationConfig.responseFieldNames = {
      ...paginationConfig.responseFieldNames,
      ...config.responseFieldNames,
    }
  }
}
