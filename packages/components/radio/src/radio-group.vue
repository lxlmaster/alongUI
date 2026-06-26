<template>
  <div
    class="al-radio-group"
    :class="[`al-radio-group--${size}`]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, toRef } from 'vue'
import { radioGroupEmits, radioGroupKey, radioGroupProps, type RadioContext } from './radio'

defineOptions({
  name: 'AlRadioGroup'
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

function selectValue(value: string | number | boolean) {
  emit('update:modelValue', value)
  emit('change', value)
}

const context: RadioContext = {
  modelValue: toRef(props, 'modelValue'),
  disabled: toRef(props, 'disabled'),
  selectValue
}

provide(radioGroupKey, context)
</script>
