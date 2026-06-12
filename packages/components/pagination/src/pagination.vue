<template>
  <div
    class="al-pagination"
    :class="{
      'al-pagination--small': small,
      'al-pagination--disabled': disabled,
      'al-pagination--background': background
    }"
  >
    <template v-for="item in layoutParsed" :key="item">
      <!-- Total -->
      <span v-if="item === 'total'" class="al-pagination__total">
        共 {{ total }} 条
      </span>

      <!-- Size selector -->
      <span v-else-if="item === 'sizes'" class="al-pagination__sizes">
        <select
          class="al-pagination__size-select"
          :value="pageSize"
          :disabled="disabled"
          @change="handleSizeChange"
        >
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }} 条/页
          </option>
        </select>
      </span>

      <!-- Prev button -->
      <button
        v-else-if="item === 'prev'"
        class="al-pagination__btn al-pagination__btn--prev"
        :class="{ 'is-disabled': isPrevDisabled }"
        :disabled="isPrevDisabled"
        type="button"
        aria-label="上一页"
        @click="handlePrev"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- Pager -->
      <ul v-else-if="item === 'pager'" class="al-pagination__pager">
        <li
          v-for="page in pagerItems"
          :key="page.value"
          class="al-pagination__page"
          :class="{
            'is-active': page.value === current,
            'is-ellipsis': page.isEllipsis
          }"
          @click="!page.isEllipsis && handlePageClick(page.value)"
        >
          <template v-if="page.isEllipsis">…</template>
          <template v-else>{{ page.value }}</template>
        </li>
      </ul>

      <!-- Next button -->
      <button
        v-else-if="item === 'next'"
        class="al-pagination__btn al-pagination__btn--next"
        :class="{ 'is-disabled': isNextDisabled }"
        :disabled="isNextDisabled"
        type="button"
        aria-label="下一页"
        @click="handleNext"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <!-- Jumper -->
      <span v-else-if="item === 'jumper'" class="al-pagination__jumper">
        前往
        <input
          class="al-pagination__jumper-input"
          type="number"
          min="1"
          :max="pageCount"
          :value="jumperValue"
          :disabled="disabled"
          @keydown.enter="handleJumper"
          @blur="handleJumper"
        />
        页
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { paginationEmits, paginationProps } from './pagination'

defineOptions({
  name: 'AlPagination'
})

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const jumperValue = ref<number | string>('')

const pageCount = computed(() => {
  const count = Math.ceil(props.total / props.pageSize)
  return Math.max(count, 1)
})

const isPrevDisabled = computed(() => props.current <= 1 || props.disabled)
const isNextDisabled = computed(() => props.current >= pageCount.value || props.disabled)

const layoutParsed = computed(() => {
  return props.layout.split(',').map(s => s.trim()).filter(Boolean)
})

const pagerItems = computed(() => {
  const totalPages = pageCount.value
  const cur = props.current
  const items: Array<{ value: number; isEllipsis: boolean }> = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      items.push({ value: i, isEllipsis: false })
    }
    return items
  }

  // Always show first page
  items.push({ value: 1, isEllipsis: false })

  if (cur > 3) {
    items.push({ value: -1, isEllipsis: true })
  }

  // Pages around current
  const start = Math.max(2, cur - 1)
  const end = Math.min(totalPages - 1, cur + 1)

  for (let i = start; i <= end; i++) {
    items.push({ value: i, isEllipsis: false })
  }

  if (cur < totalPages - 2) {
    items.push({ value: -1, isEllipsis: true })
  }

  // Always show last page
  items.push({ value: totalPages, isEllipsis: false })

  return items
})

function emitChange(current: number, pageSize: number) {
  emit('update:current', current)
  emit('update:pageSize', pageSize)
  emit('change', current, pageSize)
}

function handlePrev() {
  if (!isPrevDisabled.value) {
    const next = props.current - 1
    emitChange(next, props.pageSize)
  }
}

function handleNext() {
  if (!isNextDisabled.value) {
    const next = props.current + 1
    emitChange(next, props.pageSize)
  }
}

function handlePageClick(page: number) {
  if (page !== props.current) {
    emitChange(page, props.pageSize)
  }
}

function handleSizeChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = Number(target.value)
  if (value !== props.pageSize) {
    emitChange(1, value)
  }
}

function handleJumper(event: Event) {
  const input = event.target as HTMLInputElement
  const value = parseInt(input.value, 10)
  if (!isNaN(value) && value >= 1 && value <= pageCount.value && value !== props.current) {
    emitChange(value, props.pageSize)
  }
  jumperValue.value = ''
}
</script>
