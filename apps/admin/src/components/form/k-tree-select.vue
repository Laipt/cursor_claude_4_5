<template>
  <KFormItem _mode="select" :_props="props">
    <component
      :is="
        h(
          ElTreeSelect,
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
import { ElTreeSelect } from 'element-plus'
import { type FormItemProps, useFormContext, useFormModel, getPlaceholder } from './form'

const props = defineProps<FormItemProps>()

const { model, clearable } = useFormContext()
const { getValue, setValue } = useFormModel(model)

const vm = getCurrentInstance()
function changeRef(exposed) {
  if (vm) vm.exposed = exposed
}

defineExpose({} as InstanceType<typeof ElTreeSelect>)
</script>

<style lang="scss" scoped></style>
