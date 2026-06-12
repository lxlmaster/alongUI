<template>
  <div
    class="al-progress"
    :class="[
      `al-progress--${type}`,
      `al-progress--${size}`
    ]"
  >
    <!-- line type -->
    <template v-if="type === 'line'">
      <div class="al-progress__bar">
        <div class="al-progress__bar-outer">
          <div
            class="al-progress__bar-inner"
            :style="{
              width: `${percentage}%`,
              backgroundColor: strokeColor
            }"
          />
        </div>
      </div>
      <span v-if="showInfo" class="al-progress__info">
        {{ percentage }}%
      </span>
    </template>

    <!-- circle type -->
    <template v-else>
      <div class="al-progress__circle">
        <svg viewBox="0 0 100 100" :width="circleSize" :height="circleSize">
          <circle
            cx="50" cy="50" :r="circleRadius"
            fill="none"
            class="al-progress__circle-track"
            :stroke-width="circleStrokeWidth"
          />
          <circle
            cx="50" cy="50" :r="circleRadius"
            fill="none"
            class="al-progress__circle-path"
            :stroke="strokeColor"
            :stroke-width="circleStrokeWidth"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="circleDashOffset"
            stroke-linecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span v-if="showInfo" class="al-progress__circle-info">
          {{ percentage }}%
        </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { progressProps } from './progress'

defineOptions({
  name: 'AlProgress'
})

const props = defineProps(progressProps)

const circleSize = computed(() => props.size === 'small' ? 80 : 108)

const circleStrokeWidth = computed(() => props.size === 'small' ? 4 : 6)

const circleRadius = computed(() => props.size === 'small' ? 36 : 44)

const circumference = computed(() => {
  return 2 * Math.PI * circleRadius.value
})

const circleDashOffset = computed(() => {
  return circumference.value * (1 - props.percentage / 100)
})
</script>
