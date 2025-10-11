<template>
  <KFormItem :_props="props">
    <component
      :is="h(ElRadioGroup, {
          ...$attrs,
          ref: changeRef,
          modelValue: getValue(prop),
          'onUpdate:modelValue': (value: any) => setValue(prop, value),
      },
      () => options.map((option) => h(ElRadio, option))
    )"
    ></component>
  </KFormItem>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadio } from 'element-plus'
import { type FormItemProps, useFormContext, useFormModel } from './form'

type RadioProps = InstanceType<typeof ElRadio>
const props = defineProps<FormItemProps & { options: Partial<RadioProps>[] }>()

const { model } = useFormContext()
const { getValue, setValue } = useFormModel(model)

const vm = getCurrentInstance()
function changeRef(exposed) {
  if (vm) vm.exposed = exposed
}

defineExpose({} as InstanceType<typeof ElRadioGroup>)
</script>

<style lang="scss" scoped></style>
