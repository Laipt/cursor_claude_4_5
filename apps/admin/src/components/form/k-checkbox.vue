<template>
  <KFormItem :_props="props">
    <component
      :is="h(ElCheckboxGroup, {
          ...$attrs,
          ref: changeRef,
          modelValue: getValue(prop),
          'onUpdate:modelValue': (value: any) => setValue(prop, value),
      },
      () => options.map((option) => h(ElCheckbox, option))
    )"
    ></component>
  </KFormItem>
</template>

<script setup lang="ts">
import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
import { type FormItemProps, useFormContext, useFormModel } from './form'

type CheckboxProps = InstanceType<typeof ElCheckbox>
const props = defineProps<FormItemProps & { options: Partial<CheckboxProps>[] }>()

const { model } = useFormContext()
const { getValue, setValue } = useFormModel(model)

const vm = getCurrentInstance()
function changeRef(exposed) {
  if (vm) vm.exposed = exposed
}

defineExpose({} as InstanceType<typeof ElCheckboxGroup>)
</script>

<style lang="scss" scoped></style>
