<template>
  <div class="al-calendar">
    <div class="al-calendar__header">
      <button class="al-calendar__nav-btn" @click="prevMonth" aria-label="Previous month">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="al-calendar__title">{{ year }} 年 {{ month + 1 }} 月</span>
      <button class="al-calendar__nav-btn" @click="nextMonth" aria-label="Next month">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="al-calendar__weekdays">
      <span v-for="day in weekdays" :key="day" class="al-calendar__weekday">{{ day }}</span>
    </div>
    <div class="al-calendar__body">
      <div
        v-for="(day, idx) in days"
        :key="idx"
        class="al-calendar__day"
        :class="{
          'is-current-month': day.currentMonth,
          'is-today': day.isToday,
          'is-selected': day.isSelected,
          'is-other-month': !day.currentMonth
        }"
        @click="selectDate(day)"
      >
        <span class="al-calendar__day-text">{{ day.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { calendarProps } from './calendar'

defineOptions({
  name: 'AlCalendar'
})

const props = defineProps(calendarProps)
const emit = defineEmits<{
  'update:modelValue': [date: Date]
}>()

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const currentDate = ref(new Date(props.modelValue))
const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())

const today = new Date()
const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

const selectedDate = ref(props.modelValue)

const days = computed(() => {
  const y = year.value
  const m = month.value
  const firstDay = new Date(y, m, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const daysInPrevMonth = new Date(y, m, 0).getDate()

  const result: Array<{
    text: number
    currentMonth: boolean
    isToday: boolean
    isSelected: boolean
    date: Date
  }> = []

  // Previous month days
  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const date = new Date(y, m - 1, d)
    result.push({
      text: d,
      currentMonth: false,
      isToday: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` === todayStr,
      isSelected: false,
      date
    })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d)
    const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const selStr = `${selectedDate.value.getFullYear()}-${selectedDate.value.getMonth()}-${selectedDate.value.getDate()}`
    result.push({
      text: d,
      currentMonth: true,
      isToday: dateStr === todayStr,
      isSelected: dateStr === selStr,
      date
    })
  }

  // Next month days (fill to 6 rows)
  const remaining = 42 - result.length
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(y, m + 1, d)
    result.push({
      text: d,
      currentMonth: false,
      isToday: false,
      isSelected: false,
      date
    })
  }

  return result
})

function prevMonth() {
  currentDate.value = new Date(year.value, month.value - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(year.value, month.value + 1, 1)
}

function selectDate(day: { date: Date }) {
  selectedDate.value = day.date
  emit('update:modelValue', day.date)
}
</script>
