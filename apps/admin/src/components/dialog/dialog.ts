import { ElDialog } from 'element-plus'

/**
 * 弹框组件 hooks
 * @param params 传递一些默认插槽所需的值
 * @returns 弹框组件及所需方法
 */
type AnyObject = Record<string, any>

export default function useDialog(params: AnyObject = {}) {
  const visible = ref(false)
  const dialogTitle = ref<string>()
  /**弹框绑定的属性 attrs */
  const other = ref()

  function close() {
    other.value = null
    visible.value = false
  }

  return {
    /**
     * 打开弹框
     * @param title 弹框标题
     * @param args 弹框绑定的属性 attrs
     */
    open(title: string | AnyObject, args?: AnyObject) {
      if (typeof title === 'string') dialogTitle.value = title
      else args = title
      other.value = args
      visible.value = true
    },
    close,
    KDialog: defineComponent({
      setup(_, { slots, attrs }) {
        const data = computed(() => ({ ...other.value, ...params, close }))
        provide('_dialog', data)
        return () =>
          h(
            ElDialog,
            {
              modelValue: visible.value,
              'onUpdate:modelValue'(v) {
                visible.value = v
              },
              title: dialogTitle.value,
              destroyOnClose: true,
              closeOnClickModal: false,
              ...attrs,
            },
            {
              header: slots.header?.(),
              footer: slots.footer?.(),
              default: () => slots.default?.(),
            },
          )
      },
    }),
  }
}
