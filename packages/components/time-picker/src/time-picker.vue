<template>
  <div
    ref="rootRef"
    class="al-time-picker"
    :class="{
      'is-disabled': disabled,
      'is-open': visible
    }"
  >
    <!-- Range mode -->
    <template v-if="isRange">
      <div class="al-time-picker__range-wrap" @click="handleTriggerClick">
        <input
          class="al-time-picker__input"
          :placeholder="rangePlaceholder[0]"
          :value="rangeStartText"
          :disabled="disabled"
          readonly
        />
        <span class="al-time-picker__range-sep">—</span>
        <input
          class="al-time-picker__input"
          :placeholder="rangePlaceholder[1]"
          :value="rangeEndText"
          :disabled="disabled"
          readonly
        />
        <button
          v-if="showClear"
          class="al-time-picker__clear"
          type="button"
          aria-label="清空"
          @click.stop="handleClear"
        >
          ×
        </button>
      </div>
    </template>

    <!-- Single mode -->
    <template v-else>
      <div class="al-time-picker__input-wrap" @click="handleTriggerClick">
        <input
          class="al-time-picker__input"
          :placeholder="singlePlaceholder"
          :value="displayText"
          :disabled="disabled"
          readonly
        />
        <button
          v-if="showClear"
          class="al-time-picker__clear"
          type="button"
          aria-label="清空"
          @click.stop="handleClear"
        >
          ×
        </button>
      </div>
    </template>

    <!-- Dropdown panel -->
    <transition name="al-time-picker-fade">
      <div v-if="visible" class="al-time-picker__dropdown">
        <div class="al-time-picker__columns">
          <!-- Hours -->
          <div class="al-time-picker__column">
            <button
              v-for="h in hours"
              :key="h"
              class="al-time-picker__item"
              :class="{ 'is-selected': h === selectedHour }"
              @click="selectHour(h)"
            >
              {{ padTime(h) }}
            </button>
          </div>
          <!-- Separator -->
          <div class="al-time-picker__sep">:</div>
          <!-- Minutes -->
          <div class="al-time-picker__column">
            <button
              v-for="m in minutes"
              :key="m"
              class="al-time-picker__item"
              :class="{ 'is-selected': m === selectedMinute }"
              @click="selectMinute(m)"
            >
              {{ padTime(m) }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { timePickerEmits, timePickerProps } from './time-picker'

defineOptions({
  name: 'AlTimePicker'
})

const props = defineProps(timePickerProps)
const emit = defineEmits(timePickerEmits)

const rootRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)

function padTime(n: number): string {
  return String(n).padStart(2, '0')
}

function parseTime(str: string): { hour: number; minute: number } | null {
  const parts = str.split(':')
  if (parts.length < 2) return null
  const h = parseInt(parts[0], 10)
  const m = parseInt(parts[1], 10)
  if (isNaN(h) || isNaN(m)) return null
  return { hour: h, minute: m }
}

function formatTime(h: number, m: number): string {
  return `${padTime(h)}:${padTime(m)}`
}

// --- Placeholders ---
const singlePlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder as string
  return '选择时间'
})

const rangePlaceholder = computed((): [string, string] => {
  if (Array.isArray(props.placeholder)) return props.placeholder
  return ['开始时间', '结束时间']
})

// --- Display ---
const displayText = computed(() => {
  if (!props.modelValue) return ''
  return String(props.modelValue)
})

const rangeStartText = computed(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue[0] || ''
  return ''
})

const rangeEndText = computed(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue[1] || ''
  return ''
})

const showClear = computed(() => props.clearable && !props.disabled && !!props.modelValue)

// --- Selection state ---
const selectedHour = computed(() => {
  if (isRange.value) {
    const v = rangeStartText.value
    return v ? (parseTime(v)?.hour ?? 0) : 0
  }
  return props.modelValue ? (parseTime(String(props.modelValue))?.hour ?? 0) : 0
})

const selectedMinute = computed(() => {
  if (isRange.value) {
    const v = rangeStartText.value
    return v ? (parseTime(v)?.minute ?? 0) : 0
  }
  return props.modelValue ? (parseTime(String(props.modelValue))?.minute ?? 0) : 0
})

const isRange = computed(() => props.isRange)

// --- Scroll selected into view ---
watch(visible, (v) => {
  if (v) {
    // Check if we should choose a realistic time
    updateDefaultIfEmpty()
  }
})

function updateDefaultIfEmpty() {
  // no-op: user picks from the list
}

// --- Selection ---
function selectHour(h: number) {
  const m = selectedMinute.value
  emitChange(formatTime(h, m))
}

function selectMinute(m: number) {
  const h = selectedHour.value
  emitChange(formatTime(h, m))
}

function emitChange(value: string) {
  if (isRange.value) {
    const arr: [string, string] = [value, Array.isArray(props.modelValue) ? props.modelValue[1] || '' : '']
    emit('update:modelValue', arr)
    emit('change', arr)
  } else {
    emit('update:modelValue', value)
    emit('change', value)
  }
  visible.value = false
}

// --- Trigger ---
const disabled = computed(() => props.disabled)

function handleTriggerClick() {
  if (disabled.value) return
  visible.value = !visible.value
}

// --- Clear ---
function handleClear() {
  if (isRange.value) {
    const v: [string, string] = ['', '']
    emit('update:modelValue', v)
    emit('change', v)
  } else {
    emit('update:modelValue', '')
    emit('change', '')
  }
}

// --- Click outside ---
function handleDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    visible.value = false
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

watch(visible, (v) => {
  if (v) {
    document.addEventListener('click', handleDocumentClick)
  } else {
    document.removeEventListener('click', handleDocumentClick)
  }
})
</script>
