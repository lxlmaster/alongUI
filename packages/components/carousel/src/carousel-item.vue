<template>
  <div
    class="al-carousel-item"
    :class="{ 'is-active': isActive, 'is-animating': animating }"
    :style="itemStyle"
  >
    <slot v-if="isActive || !lazyRender" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { carouselContextKey } from './carousel'

defineOptions({
  name: 'AlCarouselItem'
})

const ctx = inject(carouselContextKey)

const uid = Symbol('carousel-item')
const lazyRender = ref(false)
const animating = ref(false)

onMounted(() => {
  ctx?.registerItem(uid as any)
})

onBeforeUnmount(() => {
  ctx?.unregisterItem(uid as any)
})

const isActive = computed(() => {
  if (!ctx) return false
  const idx = ctx.items.value.findIndex((item) => item.uid === (uid as any))
  return idx === ctx.currentIndex.value
})

const itemStyle = computed(() => {
  if (!ctx) return {}
  const idx = ctx.items.value.findIndex((item) => item.uid === (uid as any))
  const offset = idx - ctx.currentIndex.value

  if (ctx.type === 'card') {
    return {
      transform: `translateX(${offset * 100}%) scale(${idx === ctx.currentIndex.value ? 1 : 0.85})`,
      opacity: idx === ctx.currentIndex.value ? 1 : 0.5,
      zIndex: idx === ctx.currentIndex.value ? 1 : 0,
      transition: 'transform 0.4s ease, opacity 0.4s ease'
    }
  }

  return {
    transform: `translateX(${offset * 100}%)`,
    transition: 'transform 0.4s ease'
  }
})
</script>
