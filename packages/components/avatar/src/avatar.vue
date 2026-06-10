<template>
  <span
    class="al-avatar"
    :class="[
      `al-avatar--${shape}`,
      `al-avatar--${actualSize}`
    ]"
    :style="sizeStyle"
  >
    <img
      v-if="src && !hasError"
      :src="src"
      :alt="alt"
      class="al-avatar__img"
      @error="handleError"
    />
    <span v-else class="al-avatar__fallback">
      <slot>{{ fallbackText }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { avatarProps, avatarEmits } from './avatar'
import { addUnit } from '@along-ui/utils'

defineOptions({
  name: 'AlAvatar'
})

const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)

const hasError = ref(false)

const sizeMap: Record<string, number> = {
  small: 32,
  default: 40,
  large: 48
}

const actualSize = computed(() => {
  if (typeof props.size === 'number') return 'custom'
  return props.size
})

const pixelSize = computed(() => {
  if (typeof props.size === 'number') return props.size
  return sizeMap[props.size] ?? 40
})

const sizeStyle = computed(() => {
  if (typeof props.size !== 'number') return undefined
  return {
    width: addUnit(props.size),
    height: addUnit(props.size)
  }
})

const fallbackText = computed(() => {
  if (props.alt) return props.alt.charAt(0).toUpperCase()
  return '?'
})

function handleError(event: Event) {
  hasError.value = true
  emit('error', event)
}
</script>
