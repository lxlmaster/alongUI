<template>
  <div
    class="al-step"
    :class="[
      `al-step--${statusClass}`,
      `al-step--${direction}`,
      `al-step--${size}`
    ]"
  >
    <div class="al-step__indicator">
      <div class="al-step__circle" :class="{ 'is-icon': $slots.icon }">
        <slot name="icon">
          <span v-if="isFinished" class="al-step__check">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span v-else class="al-step__number">{{ index + 1 }}</span>
        </slot>
      </div>
      <div v-if="direction === 'horizontal' && !isLast" class="al-step__line">
        <div class="al-step__line-inner" :class="{ 'is-active': isFinished }" />
      </div>
    </div>
    <div class="al-step__content">
      <div class="al-step__title">{{ title }}</div>
      <div v-if="description" class="al-step__description">{{ description }}</div>
    </div>
    <div v-if="direction === 'vertical' && !isLast" class="al-step__line al-step__line--vertical">
      <div class="al-step__line-inner" :class="{ 'is-active': isFinished }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { stepsContextKey } from './steps'
import type { StepsContext } from './steps'
import { stepProps } from './step'

defineOptions({
  name: 'AlStep'
})

const props = defineProps(stepProps)

const stepsContext = inject<StepsContext>(stepsContextKey)!
const direction = stepsContext.direction
const size = stepsContext.size

const stepIndex = ref(0)
const totalSteps = ref(0)

onMounted(() => {
  stepIndex.value = stepsContext.registerStep({ index: 0 })
})

onBeforeUnmount(() => {
  stepsContext.unregisterStep(stepIndex.value)
})

const isFinished = computed(() => {
  return stepsContext.current > stepIndex.value
})

const isCurrent = computed(() => {
  return stepsContext.current === stepIndex.value
})

const isWaiting = computed(() => {
  return stepsContext.current < stepIndex.value
})

const isLast = computed(() => {
  return false
})

const statusClass = computed(() => {
  if (props.status) return props.status
  if (isFinished.value) return 'finish'
  if (isCurrent.value) return 'process'
  return 'wait'
})

const index = computed(() => stepIndex.value)
const title = computed(() => props.title)
const description = computed(() => props.description)
</script>
