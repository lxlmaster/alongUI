<template>
  <div class="al-grid" :style="gridStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { gridProps } from './grid'
import type { GridColumns } from './grid'

defineOptions({
  name: 'AlGrid'
})

const props = defineProps(gridProps)

const gapValue = computed(() => `${props.spacing * 4}px`)

const gridTemplateColumns = computed(() => {
  if (props.template) {
    return props.template
  }

  if (typeof props.columns === 'number') {
    return `repeat(${props.columns}, 1fr)`
  }

  // Responsive object: { default: 2, md: 3, lg: 4 }
  const bp = (props.columns as Record<string, number>)
  const parts: string[] = []
  const breakpoints: Record<string, number> = {
    default: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  }

  for (const [key, val] of Object.entries(bp)) {
    if (key === 'default') {
      parts.push(`repeat(${val}, 1fr)`)
    } else if (breakpoints[key]) {
      parts.push(`@media (min-width: ${breakpoints[key]}px) { repeat(${val}, 1fr) }`)
    }
  }

  // Fall back to first entry
  if (parts.length === 0) {
    const first = Object.values(bp)[0] || 2
    return `repeat(${first}, 1fr)`
  }

  return parts.join(' ')
})

const gridStyle = computed(() => {
  const style: Record<string, string> = {
    display: 'grid',
    gap: gapValue.value,
    gridTemplateColumns: gridTemplateColumns.value
  }

  if (props.rows) {
    style.gridTemplateRows = props.rows
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
