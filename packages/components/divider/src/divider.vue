<template>
  <div
    class="al-divider"
    :class="[
      `al-divider--${contentPosition}`,
      {
        'is-dashed': dashed
      }
    ]"
  >
    <span v-if="$slots.default" class="al-divider__content">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { dividerProps } from './divider'

defineOptions({
  name: 'AlDivider'
})

defineProps(dividerProps)
</script>
