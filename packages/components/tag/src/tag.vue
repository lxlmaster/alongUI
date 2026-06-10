<template>
  <span
    class="al-tag"
    :class="[
      `al-tag--${type}`,
      `al-tag--${effect}`,
      `al-tag--${size}`,
      {
        'is-hit': hit
      }
    ]"
  >
    <slot />
    <button
      v-if="closable"
      class="al-tag__close"
      type="button"
      @click.stop="handleClose"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { tagProps, tagEmits } from './tag'

defineOptions({
  name: 'AlTag'
})

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

function handleClose(event: MouseEvent) {
  emit('close', event)
}
</script>
