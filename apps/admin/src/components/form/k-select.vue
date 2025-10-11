<template>
  <KFormItem _mode="select" :_props="props">
    <component
      :is="h(ElSelect, {
          placeholder: getPlaceholder('input', label),
          clearable,
          style: 'min-width: 160px',
          ...$attrs,
          ref: changeRef,
          modelValue: getValue(prop),
          'onUpdate:modelValue': (value: any) => setValue(prop, value),
      },
      () => options.map((option) => h(ElOption, option as any))
    )"
    ></component>
  </KFormItem>
</template>

<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
import { type FormItemProps, useFormContext, useFormModel, getPlaceholder } from './form'

type OptionProps = InstanceType<typeof ElOption>
const props = defineProps<FormItemProps & { options: Partial<OptionProps>[] }>()

const { model, clearable } = useFormContext()
const { getValue, setValue } = useFormModel(model)

const vm = getCurrentInstance()
function changeRef(exposed) {
  if (vm) vm.exposed = exposed
}

defineExpose({} as InstanceType<typeof ElSelect>)
</script>

<style lang="scss" scoped></style>
