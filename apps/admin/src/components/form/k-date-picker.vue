<template>
  <KFormItem :_props="props" _mode="select">
    <component
      :is="
        h(
          ElDatePicker,
          {
            placeholder: getPlaceholder('select', label),
            startPlaceholder: `请选择开始${label}`,
            endPlaceholder: `请选择结束${label}`,
            valueFormat: 'YYYY-MM-DD',
            clearable,
            ...$attrs,
            ref: changeRef,
            modelValue: value,
            'onUpdate:modelValue': (v: any) => value = v,
          },
          $slots,
        )
      "
    />
  </KFormItem>
</template>

<script setup lang="ts">
import { ElDatePicker } from 'element-plus'
import { type FormItemProps, useFormContext, useFormModel, getPlaceholder } from './form'

const props = defineProps<FormItemProps>()

const { model, clearable } = useFormContext()
const { getValue, setValue } = useFormModel(model)

const attrs = useAttrs()
const isRage = () => (attrs?.type as string)?.endsWith('range')

const value = computed({
  get() {
    if (isRage()) {
      const [startProp, endProp] = props.prop.split(',')
      if (startProp && endProp) return [getValue(startProp), getValue(endProp)]
    }
    return getValue(props.prop)
  },
  set(v) {
    if (isRage()) {
      const [startProp, endProp] = props.prop.split(',')
      const [startValue, endValue] = v
      if (startProp && endProp) {
        setValue(startProp, startValue ? startValue + ' 00:00:00' : '')
        setValue(endProp, endValue ? endValue + ' 23:59:59' : '')
        return
      }
    }
    setValue(props.prop, v)
  },
})

const vm = getCurrentInstance()
function changeRef(exposed) {
  if (vm) vm.exposed = exposed
}

defineExpose({} as InstanceType<typeof ElDatePicker>)
</script>

<style lang="scss" scoped></style>
