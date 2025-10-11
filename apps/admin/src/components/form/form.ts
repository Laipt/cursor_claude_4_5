import { ElForm } from 'element-plus'
import { get as lodashGet, set as lodashSet } from 'lodash-es'
import type { FormItemRule, FormInstance } from 'element-plus'

type KFormProps = InstanceType<typeof ElForm>
interface Options<T> {
  defaultValues?: T
  clearable?: boolean
}

export const FORM_KEY = Symbol('formData')
export const FORM_CLEARABLE = Symbol('clearable')

export function useForm<T extends object>(options?: Options<T>) {
  const { defaultValues = {}, clearable = false } = options || {}
  const formRef = ref<FormInstance>()
  const model = reactive<any>(defaultValues)
  const loading = ref(false)

  const KForm = defineComponent<Partial<KFormProps>>({
    setup(_, { slots, attrs }) {
      provide(FORM_KEY, model)
      provide(FORM_CLEARABLE, clearable)

      return () => h(ElForm, { ...attrs, ref: formRef, model }, slots)
    },
  })

  return {
    model,
    formRef,
    loading,
    reset() {
      formRef.value?.resetFields()
    },
    setModel(data: T) {
      Object.entries(data).forEach(([k, v]) => {
        model[k] = v
      })
    },
    validate(service: (..._: any) => Promise<any>, params?: any): any {
      loading.value = true
      return new Promise((reslove) => {
        formRef.value?.validate(async (valid, fields) => {
          if (valid) {
            try {
              const ree = await service({ ...model, ...params })
              reslove(ree)
            } finally {
              loading.value = false
            }
          } else {
            loading.value = false
            formRef.value?.scrollToField(Object.keys(fields as any))
          }
        })
      })
    },
    KForm,
  }
}

export interface FormItemProps {
  prop: string
  label: string
  rules?: FormItemRule[]
  renderLabel?: any
  required?: boolean
}

/**
 * 组件内获取上下文
 */
export function useFormContext() {
  const model = inject<Record<string, any>>(FORM_KEY)
  const clearable = inject<boolean>(FORM_CLEARABLE, true)
  return { model, clearable }
}

/**
 * 统一模型访问（路径可支持 a.b.c）
 */
export function useFormModel(model) {
  function getValue(path: string, defaultValue?) {
    return lodashGet(model, path, defaultValue)
  }
  function setValue(path: string, value) {
    lodashSet(model, path, value)
  }
  return { getValue, setValue }
}

/**
 * 占位符与提示消息
 */
export function getPlaceholder(type: 'input' | 'select', label: string) {
  const prefix = type === 'input' ? '请输入' : '请选择'
  return `${prefix}${label}`
}

/**
 * 规则拼装（在组件内将 required 与外部 rules 合并即可）
 */
export function buildRules(
  required: boolean | undefined,
  label: string,
  mode: 'input' | 'select',
  extra?: FormItemRule[],
): FormItemRule[] {
  const base = required ? [{ required: true, message: getPlaceholder(mode, label) } as FormItemRule] : []
  return [...base, ...(extra ?? [])]
}
