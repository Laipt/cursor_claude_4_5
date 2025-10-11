<template>
  <component
    :is="
      h(
        ElFormItem,
        {
          label: _props.label,
          prop: _props.prop,
          rules: buildRules(_props.required, _props.label, _mode || 'input', _props.rules),
        },
        {
          ...$slots,
          label: _props.renderLabel,
        },
      )
    "
  ></component>
</template>

<script setup lang="ts">
import { ElFormItem } from 'element-plus'
import { buildRules } from './form'
import type { FormItemProps } from './form'
defineProps<{
  _mode?: 'input' | 'select'
  _props: FormItemProps
}>()
</script>

<style lang="scss" scoped></style>
