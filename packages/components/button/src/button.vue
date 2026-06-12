<template>
  <button
    ref="buttonRef"
    class="al-button"
    :class="buttonClasses"
    :type="nativeType"
    :disabled="buttonDisabled"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <span v-if="loading" class="al-button__icon al-button__loading" aria-hidden="true">
      <LoadingIcon />
    </span>
    <span v-else-if="icon || $slots.icon" class="al-button__icon" aria-hidden="true">
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>
    <span v-if="$slots.default" class="al-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { LoadingIcon } from '@along-ui/icons'
import { buttonEmits, buttonProps } from './button'

defineOptions({
  name: 'AlButton'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const buttonRef = ref<HTMLButtonElement>()

const buttonDisabled = computed(() => props.disabled || props.loading)

const isLinkType = computed(() => props.type === 'link' || props.type === 'danger')

const buttonClasses = computed(() => [
  `al-button--${props.type}`,
  `al-button--${props.size}`,
  {
    'is-loading': props.loading,
    'is-disabled': buttonDisabled.value
  }
])

function handleClick(event: MouseEvent) {
  if (buttonDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}

defineExpose({
  ref: buttonRef
})
</script>
