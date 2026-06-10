<template>
  <button
    ref="switchRef"
    class="al-switch"
    :class="{
      'is-checked': modelValue,
      'is-disabled': switchDisabled,
      'is-loading': loading
    }"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-disabled="switchDisabled || undefined"
    :disabled="switchDisabled"
    @click="handleClick"
  >
    <span v-if="inactiveText" class="al-switch__text al-switch__text--inactive">
      {{ inactiveText }}
    </span>
    <span class="al-switch__track" aria-hidden="true">
      <span class="al-switch__thumb">
        <span v-if="loading" class="al-switch__spinner" />
      </span>
    </span>
    <span v-if="activeText" class="al-switch__text al-switch__text--active">
      {{ activeText }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { switchEmits, switchProps } from './switch'

defineOptions({
  name: 'AlSwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
const switchRef = ref<HTMLButtonElement>()

const switchDisabled = computed(() => props.disabled || props.loading)

function handleClick(event: MouseEvent) {
  if (switchDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  const nextValue = !props.modelValue
  emit('update:modelValue', nextValue)
  emit('change', nextValue)
}

defineExpose({
  ref: switchRef
})
</script>
