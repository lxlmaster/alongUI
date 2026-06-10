<template>
  <component
    :is="tagName"
    class="al-title"
    :class="`al-title--${level}`"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { titleProps } from './title'

defineOptions({
  name: 'AlTitle'
})

const props = defineProps(titleProps)

const tagMap: Record<number, string> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4'
}

const tagName = computed(() => tagMap[props.level] ?? 'h1')
</script>
