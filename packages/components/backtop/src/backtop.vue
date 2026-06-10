<template>
  <transition name="al-backtop-fade">
    <button
      v-if="visible"
      ref="backtopRef"
      class="al-backtop"
      :style="positionStyle"
      :aria-label="'回到顶部'"
      @click="scrollToTop"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 16V6M10 6L6 10M10 6L14 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { backtopProps } from './backtop'

defineOptions({
  name: 'AlBacktop'
})

const props = defineProps(backtopProps)

const visible = ref(false)
const backtopRef = ref<HTMLButtonElement | null>(null)

const positionStyle = computed(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`
}))

function checkScroll() {
  const scrollY = window.scrollY || document.documentElement.scrollTop
  visible.value = scrollY >= props.visibilityHeight
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
  checkScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>
