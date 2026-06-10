<template>
  <label
    class="al-radio"
    :class="{
      'is-checked': isChecked,
      'is-disabled': radioDisabled
    }"
  >
    <span class="al-radio__input">
      <span class="al-radio__inner">
        <span v-if="isChecked" class="al-radio__dot" />
      </span>
      <input
        ref="inputRef"
        class="al-radio__original"
        type="radio"
        :checked="isChecked"
        :disabled="radioDisabled"
        :value="label"
        @change="handleChange"
      >
    </span>
    <span v-if="label !== undefined || $slots.default" class="al-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { radioEmits, radioGroupKey, radioProps } from './radio'

defineOptions({
  name: 'AlRadio'
})

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)
const inputRef = ref<HTMLInputElement>()

const radioGroup = inject(radioGroupKey, null)

const radioDisabled = computed(() => props.disabled || radioGroup?.disabled || false)

const isChecked = computed(() => {
  if (radioGroup) {
    return radioGroup.modelValue === props.label
  }
  return props.modelValue === props.label
})

function handleChange() {
  if (radioDisabled.value) return

  if (radioGroup) {
    if (props.label !== undefined) {
      radioGroup.selectValue(props.label)
    }
    return
  }

  if (props.label !== undefined) {
    emit('update:modelValue', props.label)
    emit('change', props.label)
  }
}

defineExpose({
  inputRef,
  isChecked
})
</script>
