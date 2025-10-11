<template>
  <KFormItem :_props="props">
    <component
      :is="
        h(
          ElInputNumber,
          {
            placeholder: getPlaceholder('input', label),
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
import { ElInputNumber } from 'element-plus'
import { type FormItemProps, useFormContext, useFormModel, getPlaceholder } from './form'

const props = defineProps<FormItemProps & { formateValue?: `${'*' | '/'} ${number}` }>()

const { model, clearable } = useFormContext()
const { getValue, setValue } = useFormModel(model)

const value = computed({
  get() {
    const v = getValue(props.prop)
    if (props.formateValue && v) {
      return eval(`${v} ${props.formateValue}`)
    }
    return v
  },
  set(v) {
    if (props.formateValue && v) {
      const [operator, base] = props.formateValue.split(' ')
      const result = eval(`${v} ${operator === '*' ? '/' : '*'} ${base}`)
      setValue(props.prop, result)
    } else {
      setValue(props.prop, v)
    }
  },
})

const vm = getCurrentInstance()
function changeRef(exposed) {
  if (vm) vm.exposed = exposed
}

defineExpose({} as InstanceType<typeof ElInputNumber>)
</script>

<style lang="scss" scoped></style>
