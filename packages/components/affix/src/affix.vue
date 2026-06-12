<template>
  <div ref="wrapperRef" class="al-affix-wrapper" :style="wrapperStyle">
    <div class="al-affix" :class="{ 'al-affix--fixed': isFixed }" :style="affixStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { affixEmits, affixProps } from './affix'

defineOptions({
  name: 'AlAffix'
})

const props = defineProps(affixProps)
const emit = defineEmits(affixEmits)

const wrapperRef = ref<HTMLElement | null>(null)
const isFixed = ref(false)
const offsetTop = ref(0)
const offsetWidth = ref(0)
const offsetHeight = ref(0)

const wrapperStyle = computed<CSSProperties>(() => {
  if (!isFixed.value) return {}
  return {
    height: `${offsetHeight.value}px`
  }
})

const affixStyle = computed<CSSProperties>(() => {
  if (!isFixed.value) return {}
  return {
    position: 'fixed' as const,
    top: `${props.offset}px`,
    width: `${offsetWidth.value}px`,
    zIndex: 100
  }
})

function handleScroll() {
  if (!wrapperRef.value) return

  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const wrapperTop = wrapperRef.value.getBoundingClientRect().top + scrollTop
  const shouldFix = scrollTop >= wrapperTop - props.offset

  if (shouldFix !== isFixed.value) {
    isFixed.value = shouldFix
    if (isFixed.value) {
      offsetWidth.value = wrapperRef.value.offsetWidth
      offsetHeight.value = wrapperRef.value.offsetHeight
    }
    emit('change', isFixed.value)
  }

  emit('scroll', { scrollTop, fixed: isFixed.value })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
