<template>
  <Teleport to="body">
    <transition name="al-guide-fade">
      <div
        v-if="visible"
        class="al-guide"
        @click.self="handleClose"
      >
        <!-- Mask -->
        <div
          v-if="showMask && currentStep.selector"
          class="al-guide__mask"
          :style="maskStyle"
        />

        <!-- Spotlight hole -->
        <div
          v-if="currentStep.selector && targetRect"
          class="al-guide__spotlight"
          :style="spotlightStyle"
        />

        <!-- Card -->
        <div
          v-if="currentStep.selector"
          class="al-guide__card"
          :style="cardStyle"
        >
          <div class="al-guide__step-indicator">
            第 {{ currentIndex + 1 }} / {{ steps.length }} 步
          </div>
          <div class="al-guide__title">{{ currentStep.title }}</div>
          <div class="al-guide__content">{{ currentStep.content }}</div>
          <div class="al-guide__actions">
            <button
              v-if="closeable"
              class="al-guide__btn al-guide__btn--skip"
              @click="handleClose"
            >
              跳过
            </button>
            <button
              v-if="currentIndex > 0"
              class="al-guide__btn al-guide__btn--prev"
              @click="handlePrev"
            >
              {{ prevLabel }}
            </button>
            <button
              class="al-guide__btn al-guide__btn--next"
              @click="handleNext"
            >
              {{ isLast ? doneLabel : nextLabel }}
            </button>
          </div>
        </div>

        <!-- Center mode (no target) -->
        <div v-else class="al-guide__card al-guide__card--center">
          <div class="al-guide__step-indicator">
            第 {{ currentIndex + 1 }} / {{ steps.length }} 步
          </div>
          <div class="al-guide__title">{{ currentStep.title }}</div>
          <div class="al-guide__content">{{ currentStep.content }}</div>
          <div class="al-guide__actions al-guide__actions--center">
            <button
              v-if="currentIndex > 0"
              class="al-guide__btn al-guide__btn--prev"
              @click="handlePrev"
            >
              {{ prevLabel }}
            </button>
            <button
              class="al-guide__btn al-guide__btn--next"
              @click="handleNext"
            >
              {{ isLast ? doneLabel : nextLabel }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { guideProps } from './guide'

defineOptions({
  name: 'AlGuide'
})

const props = defineProps(guideProps)
const emit = defineEmits<{
  'update:modelValue': [value: number]
  finish: []
  close: []
  change: [index: number]
}>()

const visible = ref(false)
const currentIndex = ref(props.modelValue)
const targetRect = ref<DOMRect | null>(null)

const steps = computed(() => props.steps)
const currentStep = computed(() => steps.value[currentIndex.value] || steps.value[0] || { title: '', content: '' })
const isLast = computed(() => currentIndex.value >= steps.value.length - 1)
const showMask = computed(() => props.showMask)

const maskStyle = computed(() => ({
  backgroundColor: props.maskColor
}))

const spotlightStyle = computed(() => {
  if (!targetRect.value) return {}
  const r = targetRect.value
  return {
    left: `${r.left}px`,
    top: `${r.top}px`,
    width: `${r.width}px`,
    height: `${r.height}px`
  }
})

const cardStyle = computed(() => {
  if (!currentStep.value.selector || !targetRect.value) return {}
  const r = targetRect.value
  const placement = currentStep.value.placement || 'bottom'
  const gap = 12

  const base = { position: 'fixed' as const, zIndex: 10002 }

  switch (placement) {
    case 'top':
      return { ...base, left: `${r.left}px`, bottom: `${window.innerHeight - r.top + gap}px` }
    case 'bottom':
      return { ...base, left: `${r.left}px`, top: `${r.bottom + gap}px` }
    case 'left':
      return { ...base, right: `${window.innerWidth - r.left + gap}px`, top: `${r.top}px` }
    case 'right':
      return { ...base, left: `${r.right + gap}px`, top: `${r.top}px` }
    default:
      return { ...base, left: `${r.left}px`, top: `${r.bottom + gap}px` }
  }
})

watch(() => props.modelValue, (val) => {
  currentIndex.value = val
  if (val >= 0) {
    visible.value = true
    nextTick(updateSpotlight)
  }
}, { immediate: true })

function updateSpotlight() {
  if (!currentStep.value.selector) {
    targetRect.value = null
    return
  }
  const el = document.querySelector(currentStep.value.selector)
  if (el) {
    targetRect.value = el.getBoundingClientRect()
    if (props.scrollToStep) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}

async function goTo(index: number) {
  if (index < 0 || index >= steps.value.length) return
  currentIndex.value = index
  emit('update:modelValue', index)
  emit('change', index)
  await nextTick()
  updateSpotlight()
}

async function handleNext() {
  if (currentStep.value.beforeLeave) await currentStep.value.beforeLeave()
  if (isLast.value) {
    visible.value = false
    emit('finish')
    return
  }
  const next = currentIndex.value + 1
  if (steps.value[next]?.beforeEnter) await steps.value[next].beforeEnter!()
  await goTo(next)
}

async function handlePrev() {
  if (currentStep.value.beforeLeave) await currentStep.value.beforeLeave()
  const prev = currentIndex.value - 1
  if (steps.value[prev]?.beforeEnter) await steps.value[prev].beforeEnter!()
  await goTo(prev)
}

function handleClose() {
  if (!props.closeable) return
  visible.value = false
  emit('close')
}

watch(visible, (v) => {
  if (v) {
    nextTick(updateSpotlight)
  }
})
</script>
