<template>
  <section
    class="al-container"
    :class="{ 'al-container--vertical': hasVertical }"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'

defineOptions({
  name: 'AlContainer'
})

const slots = useSlots()

const hasVertical = computed(() => {
  const slotChildren = slots.default?.() ?? []
  return slotChildren.some((child) => {
    const type = (child.type as any)?.name
    return type === 'AlHeader' || type === 'AlFooter'
  })
})
</script>
