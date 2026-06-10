<template>
  <span class="al-badge">
    <slot />
    <sup
      v-if="!hidden && content !== null"
      class="al-badge__content"
      :class="{ 'is-dot': isDot }"
    >
      {{ content }}
    </sup>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { badgeProps } from './badge'

defineOptions({
  name: 'AlBadge'
})

const props = defineProps(badgeProps)

const content = computed(() => {
  if (props.isDot) return ''

  if (typeof props.value === 'number' && typeof props.max === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value
  }

  return props.value
})
</script>
