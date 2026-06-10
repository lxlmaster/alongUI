<template>
  <span
    class="al-text"
    :class="[
      `al-text--${type}`,
      {
        'is-truncated': truncated
      }
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { textProps } from './text'

defineOptions({
  name: 'AlText'
})

defineProps(textProps)
</script>
