<template>
  <div
    class="al-card"
    :class="[`is-${shadow}-shadow`]"
  >
    <div v-if="header || $slots.header" class="al-card__header">
      <slot name="header">
        {{ header }}
      </slot>
    </div>
    <div class="al-card__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cardProps } from './card'

defineOptions({
  name: 'AlCard'
})

defineProps(cardProps)
</script>
