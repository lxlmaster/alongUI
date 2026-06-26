<template>
  <div
    class="al-timeline-item"
    :class="[
      `al-timeline-item--${computedPlacement}`,
      `al-timeline-item--${type}`
    ]"
  >
    <div class="al-timeline-item__tail" />
    <div class="al-timeline-item__node" :class="`al-timeline-item__node--${size}`" :style="nodeStyle">
      <slot name="dot">
        <span class="al-timeline-item__dot" />
      </slot>
    </div>
    <div v-if="!hideTimestamp && computedPlacement !== 'right'" class="al-timeline-item__timestamp al-timeline-item__timestamp--left">
      {{ timestamp }}
    </div>
    <div class="al-timeline-item__content">
      <slot />
    </div>
    <div v-if="!hideTimestamp && computedPlacement === 'right'" class="al-timeline-item__timestamp al-timeline-item__timestamp--right">
      {{ timestamp }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { timelineContextKey, timelineItemProps } from './timeline'

defineOptions({
  name: 'AlTimelineItem'
})

const props = defineProps(timelineItemProps)
const ctx = inject(timelineContextKey, null)

const computedPlacement = computed(() => props.placement || ctx?.placement || 'left')

const nodeColors: Record<string, string> = {
  primary: '#007aff',
  success: '#30d158',
  warning: '#ff9f0a',
  danger: '#ff453a',
  info: '#c7c7cc'
}

const nodeStyle = computed(() => {
  if (props.color) return { borderColor: props.color, backgroundColor: props.color }
  return {
    borderColor: nodeColors[props.type] || nodeColors.info,
    backgroundColor: nodeColors[props.type] || nodeColors.info
  }
})
</script>
