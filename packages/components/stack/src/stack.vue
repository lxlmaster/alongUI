<template>
  <div class="al-stack" :style="stackStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { stackProps } from './stack'

defineOptions({
  name: 'AlStack'
})

const props = defineProps(stackProps)

const gapValue = computed(() => `${props.spacing * 4}px`)

const stackStyle = computed(() => {
  const style: Record<string, string> = {
    display: 'flex',
    flexDirection: props.direction,
    gap: gapValue.value
  }

  if (props.wrap) {
    style.flexWrap = 'wrap'
  }

  if (props.distributed) {
    style.justifyContent = 'space-between'
    style.alignItems = 'center'
  }

  if (props.align) {
    style.alignItems = props.align
  }

  if (props.justify) {
    style.justifyContent = props.justify
  }

  return style
})
</script>
