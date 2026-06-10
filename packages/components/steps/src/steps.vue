<template>
  <div
    class="al-steps"
    :class="[
      `al-steps--${direction}`,
      `al-steps--${size}`
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { stepsContextKey, stepsEmits, stepsProps } from './steps'
import type { StepsContext } from './steps'

defineOptions({
  name: 'AlSteps'
})

const props = defineProps(stepsProps)
const emit = defineEmits(stepsEmits)

const stepCount = ref(0)

const stepsContext: StepsContext = {
  current: props.current,
  direction: props.direction,
  size: props.size,
  registerStep: () => {
    const idx = stepCount.value
    stepCount.value++
    return idx
  },
  unregisterStep: () => {
    stepCount.value--
  }
}

provide(stepsContextKey, stepsContext)
</script>
