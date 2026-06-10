<template>
  <label
    class="al-checkbox"
    :class="[
      {
        'is-checked': isChecked,
        'is-disabled': checkboxDisabled,
        'is-indeterminate': indeterminate
      }
    ]"
  >
    <span class="al-checkbox__input" @click="handleClick">
      <span class="al-checkbox__inner">
        <span v-if="isChecked" class="al-checkbox__checkmark" />
      </span>
      <input
        ref="inputRef"
        class="al-checkbox__original"
        type="checkbox"
        :checked="isChecked"
        :disabled="checkboxDisabled"
        :indeterminate="indeterminate"
        @change="handleChange"
      >
    </span>
    <span v-if="label !== undefined || $slots.default" class="al-checkbox__label" @click="handleClick">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { checkboxEmits, checkboxGroupKey, checkboxProps } from './checkbox'

defineOptions({
  name: 'AlCheckbox'
})

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)
const inputRef = ref<HTMLInputElement>()

const checkboxGroup = inject(checkboxGroupKey, null)

const checkboxDisabled = computed(() => props.disabled || checkboxGroup?.disabled || false)

const isChecked = computed(() => {
  if (checkboxGroup) {
    const label = props.label
    if (label !== undefined) {
      return checkboxGroup.modelValue.includes(label)
    }
    return false
  }
  return !!props.modelValue
})

function handleClick() {
  if (checkboxDisabled.value) return
}

function handleChange() {
  if (checkboxDisabled.value) return

  if (checkboxGroup) {
    const label = props.label
    if (label !== undefined) {
      checkboxGroup.toggleValue(label)
    }
    return
  }

  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

defineExpose({
  inputRef,
  isChecked
})
</script>
