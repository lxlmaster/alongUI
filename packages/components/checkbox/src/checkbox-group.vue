<template>
  <div
    class="al-checkbox-group"
    :class="[`al-checkbox-group--${size}`]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, toRef } from 'vue'
import { checkboxGroupEmits, checkboxGroupKey, checkboxGroupProps, type CheckboxContext } from './checkbox'

defineOptions({
  name: 'AlCheckboxGroup'
})

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

function toggleValue(value: string | number | boolean) {
  const current = [...props.modelValue]
  const index = current.indexOf(value)
  if (index > -1) {
    current.splice(index, 1)
  } else {
    current.push(value)
  }
  emit('update:modelValue', current)
  emit('change', current)
}

const context: CheckboxContext = {
  modelValue: toRef(props, 'modelValue'),
  disabled: toRef(props, 'disabled'),
  toggleValue
}

provide(checkboxGroupKey, context)
</script>
