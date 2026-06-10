<template>
  <div class="al-center" :style="centerStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { centerProps } from './center'

defineOptions({
  name: 'AlCenter'
})

const props = defineProps(centerProps)

const centerStyle = computed(() => {
  const style: Record<string, string> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  if (props.maxWidth) {
    style.maxWidth = props.maxWidth
  }

  return style
})
</script>
