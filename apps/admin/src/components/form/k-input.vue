<template>
  <KFormItem :_props="props">
    <component
      :is="
        h(
          ElInput,
          {
            placeholder: getPlaceholder('input', label),
            clearable,
            ...$attrs,
            ref: changeRef,
            modelValue: getValue(prop),
            'onUpdate:modelValue': (value: any) => setValue(prop, value),
          },
          $slots,
        )
      "
    />
  </KFormItem>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import { type FormItemProps, useFormContext, useFormModel, getPlaceholder } from './form'

const props = defineProps<FormItemProps>()

const { model, clearable } = useFormContext()
const { getValue, setValue } = useFormModel(model)

const vm = getCurrentInstance()
function changeRef(exposed) {
  if (vm) vm.exposed = exposed
}

defineExpose({} as InstanceType<typeof ElInput>)
</script>

<style lang="scss" scoped></style>
