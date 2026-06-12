<template>
  <div
    ref="sliderRef"
    class="al-slider"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div
      class="al-slider__track"
      @mousedown="handleMouseDown"
    >
      <div
        class="al-slider__bar"
        :style="{ width: `${percent}%` }"
      />
      <div
        ref="handleRef"
        class="al-slider__handle"
        :style="{ left: `${percent}%` }"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        tabindex="0"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        :aria-disabled="disabled"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.left.prevent="stepDown"
        @keydown.right.prevent="stepUp"
        @keydown.down.prevent="stepDown"
        @keydown.up.prevent="stepUp"
      >
        <span
          v-if="showTooltip && (showTip || dragging)"
          class="al-slider__tooltip"
        >
          {{ currentValue }}
        </span>
      </div>
    </div>
    <div class="al-slider__marks" v-if="showMarkers">
      <span
        v-for="mark in marks"
        :key="mark"
        class="al-slider__mark"
        :class="{ 'is-active': mark <= currentValue }"
        :style="{ left: `${((mark - min) / (max - min)) * 100}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { sliderEmits, sliderProps } from './slider'

defineOptions({
  name: 'AlSlider'
})

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const sliderRef = ref<HTMLElement>()
const handleRef = ref<HTMLElement>()
const dragging = ref(false)
const showTip = ref(false)

const percent = computed(() => {
  if (props.max === props.min) return 0
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const currentValue = computed(() => props.modelValue)

const showMarkers = computed(() => props.max - props.min <= 20)

const marks = computed(() => {
  const m: number[] = []
  if (!showMarkers.value) return m
  for (let i = props.min; i <= props.max; i++) {
    m.push(i)
  }
  return m
})

function updateValue(clientX: number) {
  if (!sliderRef.value || props.disabled) return
  const rect = sliderRef.value.getBoundingClientRect()
  let x = (clientX - rect.left) / rect.width
  x = Math.max(0, Math.min(x, 1))

  const range = props.max - props.min
  let value = props.min + x * range

  if (props.step > 0) {
    const stepCount = Math.round((value - props.min) / props.step)
    value = props.min + stepCount * props.step
  }

  value = Math.max(props.min, Math.min(props.max, value))
  value = parseFloat(value.toFixed(2))

  emit('update:modelValue', value)
}

function handleMouseDown(event: MouseEvent) {
  if (props.disabled) return
  event.preventDefault()
  dragging.value = true
  updateValue(event.clientX)

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

function handleMouseMove(event: MouseEvent) {
  updateValue(event.clientX)
}

function handleMouseUp() {
  dragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  emit('change', props.modelValue)
}

function stepDown() {
  if (props.disabled) return
  const value = Math.max(props.min, props.modelValue - props.step)
  emit('update:modelValue', parseFloat(value.toFixed(2)))
  emit('change', parseFloat(value.toFixed(2)))
}

function stepUp() {
  if (props.disabled) return
  const value = Math.min(props.max, props.modelValue + props.step)
  emit('update:modelValue', parseFloat(value.toFixed(2)))
  emit('change', parseFloat(value.toFixed(2)))
}

function handleMouseEnter() {
  showTip.value = true
}

function handleMouseLeave() {
  showTip.value = false
}

function handleFocus() {
  showTip.value = true
}

function handleBlur() {
  showTip.value = false
}

defineExpose({
  currentValue
})
</script>
