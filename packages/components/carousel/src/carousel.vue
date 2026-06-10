<template>
  <div
    class="al-carousel"
    :class="{ 'al-carousel--card': type === 'card' }"
    :style="carouselStyle"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <div class="al-carousel__container" ref="containerRef">
      <slot />
    </div>
    <div class="al-carousel__indicators">
      <button
        v-for="(_, idx) in items"
        :key="idx"
        class="al-carousel__indicator"
        :class="{ 'is-active': idx === currentIndex }"
        @click="setActive(idx)"
        :aria-label="`Go to slide ${idx + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { carouselContextKey, carouselEmits, carouselProps } from './carousel'
import type { CarouselContext } from './carousel'

defineOptions({
  name: 'AlCarousel'
})

const props = defineProps(carouselProps)
const emit = defineEmits(carouselEmits)

const items = ref<{ uid: number; active: boolean }[]>([])
const currentIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const carouselStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.height) {
    style.height = props.height
  }
  return style
})

function registerItem(uid: number) {
  items.value.push({ uid, active: false })
}

function unregisterItem(uid: number) {
  items.value = items.value.filter(i => i.uid !== uid)
}

function setActive(index: number) {
  currentIndex.value = index
  updateItems()
  emit('change', index)
}

function updateItems() {
  items.value.forEach((item, idx) => {
    item.active = idx === currentIndex.value
  })
}

function next() {
  const len = items.value.length
  if (len === 0) return
  currentIndex.value = (currentIndex.value + 1) % len
  updateItems()
  emit('change', currentIndex.value)
}

function startAutoPlay() {
  if (props.interval <= 0) return
  stopAutoPlay()
  timer = setInterval(() => next(), props.interval)
}

function stopAutoPlay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const carouselContext: CarouselContext = {
  items,
  currentIndex,
  type: props.type,
  registerItem,
  unregisterItem
}

provide(carouselContextKey, carouselContext)

onMounted(() => {
  updateItems()
  startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})

defineExpose({
  setActive,
  next,
  prev: () => {
    const len = items.value.length
    if (len === 0) return
    currentIndex.value = (currentIndex.value - 1 + len) % len
    updateItems()
    emit('change', currentIndex.value)
  }
})
</script>
