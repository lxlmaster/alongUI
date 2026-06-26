<template>
  <div
    ref="rootRef"
    class="al-date-picker"
    :class="{
      'is-disabled': disabled,
      'is-open': visible
    }"
  >
    <!-- Daterange: two inputs -->
    <template v-if="type === 'daterange'">
      <div class="al-date-picker__range-wrap" @click="handleTriggerClick">
        <input
          ref="startInput"
          class="al-date-picker__input"
          :placeholder="rangePlaceholder[0]"
          :value="rangeStartText"
          :disabled="disabled"
          readonly
        />
        <span class="al-date-picker__range-sep">—</span>
        <input
          ref="endInput"
          class="al-date-picker__input"
          :placeholder="rangePlaceholder[1]"
          :value="rangeEndText"
          :disabled="disabled"
          readonly
        />
        <button
          v-if="showClear"
          class="al-date-picker__clear"
          type="button"
          aria-label="清空"
          @click.stop="handleClear"
        >
          ×
        </button>
      </div>
    </template>

    <!-- Datetime: use native input -->
    <template v-else-if="type === 'datetime'">
      <div class="al-date-picker__input-wrap" @click="handleTriggerClick">
        <input
          ref="nativeInput"
          class="al-date-picker__input"
          type="datetime-local"
          :value="nativeValue"
          :placeholder="singlePlaceholder"
          :disabled="disabled"
          @input="handleNativeInput"
          @change="handleNativeChange"
        />
        <button
          v-if="showClear"
          class="al-date-picker__clear"
          type="button"
          aria-label="清空"
          @click.stop="handleClear"
        >
          ×
        </button>
      </div>
    </template>

    <!-- Date / Month: custom panel -->
    <template v-else>
      <div class="al-date-picker__input-wrap" @click="handleTriggerClick">
        <input
          class="al-date-picker__input"
          :value="displayText"
          :placeholder="singlePlaceholder"
          :disabled="disabled"
          readonly
        />
        <button
          v-if="showClear"
          class="al-date-picker__clear"
          type="button"
          aria-label="清空"
          @click.stop="handleClear"
        >
          ×
        </button>
      </div>

      <!-- Dropdown panel -->
      <transition name="al-date-picker-fade">
        <div v-if="visible" class="al-date-picker__dropdown">
          <!-- Header -->
          <div class="al-date-picker__header">
            <button class="al-date-picker__nav-btn" @click="prevPage" aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <span class="al-date-picker__title">{{ headerTitle }}</span>
            <button class="al-date-picker__nav-btn" @click="nextPage" aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- Month picker -->
          <div v-if="type === 'month'" class="al-date-picker__months">
            <button
              v-for="(m, idx) in months"
              :key="idx"
              class="al-date-picker__month-item"
              :class="{ 'is-selected': m.isSelected }"
              @click="selectMonth(idx)"
            >
              {{ m.label }}
            </button>
          </div>

          <!-- Date grid -->
          <template v-else>
            <div class="al-date-picker__weekdays">
              <span v-for="d in weekdays" :key="d" class="al-date-picker__weekday">{{ d }}</span>
            </div>
            <div class="al-date-picker__days">
              <div
                v-for="(day, idx) in days"
                :key="idx"
                class="al-date-picker__day"
                :class="{
                  'is-current-month': day.currentMonth,
                  'is-other-month': !day.currentMonth,
                  'is-today': day.isToday,
                  'is-selected': day.isSelected,
                  'is-in-range': day.isInRange,
                  'is-range-start': day.isRangeStart,
                  'is-range-end': day.isRangeEnd
                }"
                @click="selectDay(day)"
              >
                <span class="al-date-picker__day-text">{{ day.text }}</span>
              </div>
            </div>
          </template>
        </div>
      </transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { datePickerEmits, datePickerProps } from './date-picker'

defineOptions({
  name: 'AlDatePicker'
})

const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)

const rootRef = ref<HTMLElement | null>(null)
const startInput = ref<HTMLElement | null>(null)
const endInput = ref<HTMLElement | null>(null)
const nativeInput = ref<HTMLElement | null>(null)
const visible = ref(false)

// --- Helpers ---
function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function parseDate(str: string): Date | null {
  const d = new Date(str)
  return isNaN(d.getTime()) ? null : d
}

// Today reference
const today = new Date()
const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

// --- Navigation state ---
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

// --- Placeholders ---
const singlePlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder as string
  if (props.type === 'month') return '选择月份'
  return '选择日期'
})

const rangePlaceholder = computed((): [string, string] => {
  if (Array.isArray(props.placeholder)) return props.placeholder
  return ['开始日期', '结束日期']
})

// --- Display text ---
const displayText = computed(() => {
  if (!props.modelValue) return ''
  if (props.modelValue instanceof Date) return formatDate(props.modelValue)
  const d = parseDate(props.modelValue as string)
  return d ? formatDate(d) : String(props.modelValue)
})

const nativeValue = computed(() => {
  if (!props.modelValue) return ''
  if (props.modelValue instanceof Date) {
    const d = props.modelValue as Date
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  }
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

// --- Selected helpers ---
const singleSelected = computed(() => {
  if (typeIsRange.value) return null
  if (!props.modelValue) return null
  const d = props.modelValue instanceof Date ? props.modelValue : parseDate(props.modelValue as string)
  return d
})

const typeIsRange = computed(() => props.type === 'daterange')

const selectedRangeStart = computed(() => {
  if (!typeIsRange.value || !Array.isArray(props.modelValue)) return null
  return parseDate(props.modelValue[0])
})

const selectedRangeEnd = computed(() => {
  if (!typeIsRange.value || !Array.isArray(props.modelValue)) return null
  return parseDate(props.modelValue[1])
})

// --- Header ---
const headerTitle = computed(() => {
  if (props.type === 'month') return `${currentYear.value} 年`
  return `${currentYear.value} 年 ${currentMonth.value + 1} 月`
})

const months = computed(() => {
  const selMonth = singleSelected.value
  return Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1} 月`,
    isSelected: selMonth !== null && selMonth.getFullYear() === currentYear.value && selMonth.getMonth() === i
  }))
})

// --- Day grid ---
const days = computed(() => {
  const y = currentYear.value
  const m = currentMonth.value
  const firstDay = new Date(y, m, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const daysInPrevMonth = new Date(y, m, 0).getDate()

  const result: Array<{
    text: number
    currentMonth: boolean
    isToday: boolean
    isSelected: boolean
    isInRange: boolean
    isRangeStart: boolean
    isRangeEnd: boolean
    date: Date
  }> = []

  // Previous month days
  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const date = new Date(y, m - 1, d)
    result.push(dayEntry(date, false))
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d)
    result.push(dayEntry(date, true))
  }

  // Fill remaining to 6 rows
  const remaining = 42 - result.length
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(y, m + 1, d)
    result.push(dayEntry(date, false))
  }

  return result
})

function dayEntry(date: Date, currentMonth: boolean) {
  const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  const sel = singleSelected.value
  let isSelected = false
  let isInRange = false
  let isRangeStart = false
  let isRangeEnd = false

  if (typeIsRange.value) {
    const start = selectedRangeStart.value
    const end = selectedRangeEnd.value
    if (start && end) {
      const t = date.getTime()
      const s = start.getTime()
      const e = end.getTime()
      isInRange = t >= s && t <= e
      isRangeStart = t === s
      isRangeEnd = t === e
    } else if (start) {
      isSelected = dateStr === `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`
    }
  } else {
    if (sel) {
      isSelected = dateStr === `${sel.getFullYear()}-${sel.getMonth()}-${sel.getDate()}`
    }
  }

  return {
    text: date.getDate(),
    currentMonth,
    isToday: dateStr === todayStr,
    isSelected,
    isInRange,
    isRangeStart,
    isRangeEnd,
    date
  }
}

function prevPage() {
  if (props.type === 'month') {
    currentYear.value--
  } else {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
  }
}

function nextPage() {
  if (props.type === 'month') {
    currentYear.value++
  } else {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
  }
}

// --- Selection ---
function selectMonth(month: number) {
  const d = new Date(currentYear.value, month, 1)
  const value = formatDate(d)
  emit('update:modelValue', value)
  emit('change', value)
  visible.value = false
}

function selectDay(day: { date: Date }) {
  if (typeIsRange.value) {
    // Daterange logic: first click = start, second = end
    const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : ['', '']
    if (!arr[0] || (arr[0] && arr[1])) {
      arr[0] = formatDate(day.date)
      arr[1] = ''
    } else {
      const start = parseDate(arr[0])!
      if (day.date < start) {
        arr[1] = arr[0]
        arr[0] = formatDate(day.date)
      } else {
        arr[1] = formatDate(day.date)
      }
    }
    const value: [string, string] = [arr[0], arr[1]]
    emit('update:modelValue', value)
    emit('change', value)
    if (arr[0] && arr[1]) visible.value = false
    return
  }

  const value = formatDate(day.date)
  emit('update:modelValue', value)
  emit('change', value)
  visible.value = false
}

// --- Native input (datetime) ---
function handleNativeInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

function handleNativeChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('change', value)
}

// --- Clear ---
function handleClear() {
  if (typeIsRange.value) {
    const value: [string, string] = ['', '']
    emit('update:modelValue', value)
    emit('change', value)
  } else {
    emit('update:modelValue', '')
    emit('change', '')
  }
}

// --- Trigger ---
function handleTriggerClick() {
  if (disabled.value) return
  if (props.type === 'datetime') return
  visible.value = !visible.value
}

const disabled = computed(() => props.disabled)

// --- Click outside ---
function handleDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    visible.value = false
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// Init open listener on visible change
watch(visible, (v) => {
  if (v) {
    document.addEventListener('click', handleDocumentClick)
  } else {
    document.removeEventListener('click', handleDocumentClick)
  }
})
</script>
