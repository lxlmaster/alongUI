<template>
  <div
    ref="rootRef"
    class="al-color-picker"
    :class="{
      'is-disabled': disabled,
      'is-open': visible
    }"
  >
    <div
      class="al-color-picker__trigger"
      tabindex="0"
      role="button"
      :aria-disabled="disabled"
      @click="togglePanel"
      @keydown.enter="togglePanel"
      @keydown.space.prevent="togglePanel"
    >
      <span
        class="al-color-picker__color"
        :style="{ background: currentColor }"
      >
        <span v-if="!currentColor || currentColor === 'transparent'" class="al-color-picker__empty" />
      </span>
      <span class="al-color-picker__label">{{ currentColor }}</span>
      <span class="al-color-picker__arrow" aria-hidden="true" />
    </div>

    <div v-if="visible" class="al-color-picker__dropdown">
      <div class="al-color-picker__panel">
        <div class="al-color-picker__saturation" ref="saturationRef" @mousedown="handleSaturationMouseDown">
          <div class="al-color-picker__saturation-white" />
          <div class="al-color-picker__saturation-black" />
          <span
            class="al-color-picker__thumb"
            :style="saturationThumbStyle"
          />
        </div>

        <div class="al-color-picker__hue" ref="hueRef" @mousedown="handleHueMouseDown">
          <span
            class="al-color-picker__thumb"
            :style="{ left: `${(hue / 360) * 100}%` }"
          />
        </div>

        <div v-if="showAlpha" class="al-color-picker__alpha" ref="alphaRef" @mousedown="handleAlphaMouseDown">
          <div
            class="al-color-picker__alpha-gradient"
            :style="alphaGradientStyle"
          />
          <span
            class="al-color-picker__thumb"
            :style="{ left: `${alpha * 100}%` }"
          />
        </div>

        <div class="al-color-picker__predefine" v-if="predefine && predefine.length">
          <span
            v-for="color in predefine"
            :key="color"
            class="al-color-picker__predefine-color"
            :class="{ 'is-active': color.toUpperCase() === currentColor.toUpperCase() }"
            :style="{ background: color }"
            @click="selectPredefine(color)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { colorPickerEmits, colorPickerProps } from './color-picker'

defineOptions({
  name: 'AlColorPicker'
})

const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const rootRef = ref<HTMLElement>()
const saturationRef = ref<HTMLElement>()
const hueRef = ref<HTMLElement>()
const alphaRef = ref<HTMLElement>()
const visible = ref(false)

// Parse the hex color to HSV
function hexToHsv(hex: string): { h: number; s: number; v: number; a: number } {
  let h = 0, s = 0, v = 0, a = 1

  let cleanHex = hex.replace('#', '')
  if (cleanHex.length === 3) {
    cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2]
  }
  if (cleanHex.length === 8) {
    a = parseInt(cleanHex.slice(6, 8), 16) / 255
    cleanHex = cleanHex.slice(0, 6)
  }

  const r = parseInt(cleanHex.slice(0, 2), 16) / 255
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min

  if (d === 0) {
    h = 0
  } else if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) * 60
  } else if (max === g) {
    h = ((b - r) / d + 2) * 60
  } else {
    h = ((r - g) / d + 4) * 60
  }

  s = max === 0 ? 0 : d / max
  v = max

  return { h, s, v, a }
}

function hsvToHex(h: number, s: number, v: number, a: number): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  }

  const r = Math.round(f(5) * 255)
  const g = Math.round(f(3) * 255)
  const b = Math.round(f(1) * 255)

  const hex = '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase()

  if (props.showAlpha && a < 1) {
    const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0')
    return hex + alphaHex
  }

  return hex
}

const parsed = computed(() => {
  try {
    return hexToHsv(props.modelValue || '#1D1D1F')
  } catch {
    return { h: 0, s: 0, v: 0, a: 1 }
  }
})

const hue = ref(parsed.value.h)
const saturation = ref(parsed.value.s * 100)
const value = ref(parsed.value.v * 100)
const alpha = ref(parsed.value.a)

const currentColor = computed(() => {
  return hsvToHex(hue.value, saturation.value / 100, value.value / 100, alpha.value)
})

const saturationThumbStyle = computed(() => ({
  left: `${saturation.value}%`,
  top: `${100 - value.value}%`
}))

const alphaGradientStyle = computed(() => ({
  background: `linear-gradient(to right, transparent, ${hsvToHex(hue.value, 1, 1, 1)})`
}))

watch(parsed, (p) => {
  hue.value = p.h
  saturation.value = p.s * 100
  value.value = p.v * 100
  alpha.value = p.a
})

function togglePanel() {
  if (props.disabled) return
  visible.value = !visible.value
}

function selectPredefine(color: string) {
  const p = hexToHsv(color)
  hue.value = p.h
  saturation.value = p.s * 100
  value.value = p.v * 100
  alpha.value = p.a
  commitColor()
}

function commitColor() {
  emit('update:modelValue', currentColor.value)
  emit('change', currentColor.value)
}

function handleSaturationMouseDown(event: MouseEvent) {
  updateSaturation(event)
  document.addEventListener('mousemove', handleSaturationMouseMove)
  document.addEventListener('mouseup', handleSaturationMouseUp)
}

function handleSaturationMouseMove(event: MouseEvent) {
  updateSaturation(event)
}

function handleSaturationMouseUp() {
  document.removeEventListener('mousemove', handleSaturationMouseMove)
  document.removeEventListener('mouseup', handleSaturationMouseUp)
  commitColor()
}

function updateSaturation(event: MouseEvent) {
  if (!saturationRef.value) return
  const rect = saturationRef.value.getBoundingClientRect()
  let x = event.clientX - rect.left
  let y = event.clientY - rect.top
  x = Math.max(0, Math.min(x, rect.width))
  y = Math.max(0, Math.min(y, rect.height))
  saturation.value = (x / rect.width) * 100
  value.value = (1 - y / rect.height) * 100
}

function handleHueMouseDown(event: MouseEvent) {
  updateHue(event)
  document.addEventListener('mousemove', handleHueMouseMove)
  document.addEventListener('mouseup', handleHueMouseUp)
}

function handleHueMouseMove(event: MouseEvent) {
  updateHue(event)
}

function handleHueMouseUp() {
  document.removeEventListener('mousemove', handleHueMouseMove)
  document.removeEventListener('mouseup', handleHueMouseUp)
  commitColor()
}

function updateHue(event: MouseEvent) {
  if (!hueRef.value) return
  const rect = hueRef.value.getBoundingClientRect()
  let x = event.clientX - rect.left
  x = Math.max(0, Math.min(x, rect.width))
  hue.value = (x / rect.width) * 360
}

function handleAlphaMouseDown(event: MouseEvent) {
  updateAlpha(event)
  document.addEventListener('mousemove', handleAlphaMouseMove)
  document.addEventListener('mouseup', handleAlphaMouseUp)
}

function handleAlphaMouseMove(event: MouseEvent) {
  updateAlpha(event)
}

function handleAlphaMouseUp() {
  document.removeEventListener('mousemove', handleAlphaMouseMove)
  document.removeEventListener('mouseup', handleAlphaMouseUp)
  commitColor()
}

function updateAlpha(event: MouseEvent) {
  if (!alphaRef.value) return
  const rect = alphaRef.value.getBoundingClientRect()
  let x = event.clientX - rect.left
  x = Math.max(0, Math.min(x, rect.width))
  alpha.value = x / rect.width
}

function handleDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    visible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('mousemove', handleSaturationMouseMove)
  document.removeEventListener('mouseup', handleSaturationMouseUp)
  document.removeEventListener('mousemove', handleHueMouseMove)
  document.removeEventListener('mouseup', handleHueMouseUp)
  document.removeEventListener('mousemove', handleAlphaMouseMove)
  document.removeEventListener('mouseup', handleAlphaMouseUp)
})

defineExpose({
  currentColor
})
</script>
