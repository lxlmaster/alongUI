<template>
  <div class="al-timeline" :class="[`al-timeline--${placement}`, { 'al-timeline--reverse': reverse }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { timelineContextKey, timelineProps } from './timeline'

defineOptions({
  name: 'AlTimeline'
})

const props = defineProps(timelineProps)

provide(timelineContextKey, {
  reverse: props.reverse,
  placement: props.placement
})
</script>
