<template>
  <div
    ref="tableWrapper"
    class="al-table"
    :class="[
      `al-table--${size}`,
      {
        'al-table--border': border,
        'al-table--stripe': stripe,
        'al-table--loading': loading
      }
    ]"
  >
    <div
      class="al-table__body-wrapper"
      :class="{ 'al-table__body-wrapper--scrollable': maxHeight !== undefined }"
      :style="maxHeight !== undefined ? { maxHeight: maxHeightPx } : undefined"
    >
      <table class="al-table__table">
        <colgroup>
          <col v-for="col in columns" :key="col.id" :style="colWidthStyle(col)" />
        </colgroup>
        <thead class="al-table__header">
          <tr>
            <th
              v-for="col in columns"
              :key="col.id"
              class="al-table__cell al-table__header-cell"
              :class="[
                `al-table__cell--align-${col.align}`,
                col.fixed ? `al-table__cell--fixed-${col.fixed}` : ''
              ]"
              :style="fixedColStyle(col)"
              :tabindex="col.sortable ? 0 : -1"
              @click="col.sortable && handleSort(col)"
              @keydown.enter="col.sortable && handleSort(col)"
              @keydown.space.prevent="col.sortable && handleSort(col)"
            >
              <span class="al-table__header-label">{{ col.label }}</span>
              <span v-if="col.sortable" class="al-table__sort-icons" aria-hidden="true">
                <svg
                  class="al-table__sort-icon"
                  :class="{ 'al-table__sort-icon--active': sortState.prop === col.prop && sortState.order === 'asc' }"
                  width="10" height="6" viewBox="0 0 10 6" fill="currentColor"
                >
                  <path d="M5 0L10 6H0z" />
                </svg>
                <svg
                  class="al-table__sort-icon"
                  :class="{ 'al-table__sort-icon--active': sortState.prop === col.prop && sortState.order === 'desc' }"
                  width="10" height="6" viewBox="0 0 10 6" fill="currentColor"
                >
                  <path d="M5 6L0 0h10z" />
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="al-table__body">
          <tr
            v-for="(row, rowIndex) in sortedData"
            :key="rowKey ? row[rowKey] : rowIndex"
            class="al-table__row"
            :class="{
              'al-table__row--stripe': stripe && rowIndex % 2 === 1,
              'al-table__row--highlight': highlightCurrentRow && currentRowIndex === rowIndex
            }"
            @click="handleRowClick(row, rowIndex)"
          >
            <td
              v-for="col in columns"
              :key="col.id"
              class="al-table__cell"
              :class="[
                `al-table__cell--align-${col.align}`,
                col.fixed ? `al-table__cell--fixed-${col.fixed}` : ''
              ]"
              :style="fixedColStyle(col)"
            >
              <template v-if="col.renderSlot">
                <component :is="col.renderSlot({ row, $index: rowIndex, column: col })" />
              </template>
              <template v-else>
                {{ col.prop ? row[col.prop] : '' }}
              </template>
            </td>
          </tr>
          <tr v-if="sortedData.length === 0">
            <td class="al-table__cell al-table__empty" :colspan="columns.length">
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="al-table__loading-overlay">
      <div class="al-table__spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { tableContextKey, tableEmits, tableProps, type ColumnInfo, type SortState } from './table'

defineOptions({
  name: 'AlTable'
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const tableWrapper = ref<HTMLElement>()
const columns = ref<ColumnInfo[]>([])
const currentRowIndex = ref(-1)
const sortState = ref<SortState>({ prop: null, order: null })

const maxHeightPx = computed(() => {
  if (props.maxHeight === undefined) return undefined
  return typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
})

const sortedData = computed(() => {
  const data = props.data
  if (!sortState.value.prop || !sortState.value.order) return data

  return [...data].sort((a, b) => {
    const aVal = a[sortState.value.prop!]
    const bVal = b[sortState.value.prop!]
    if (aVal == null) return 1
    if (bVal == null) return -1
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const cmp = aVal.localeCompare(bVal)
      return sortState.value.order === 'asc' ? cmp : -cmp
    }
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return sortState.value.order === 'asc' ? cmp : -cmp
  })
})

function registerColumn(col: ColumnInfo) {
  columns.value.push(col)
}

function handleSort(col: ColumnInfo) {
  if (!col.prop) return
  if (sortState.value.prop !== col.prop) {
    sortState.value = { prop: col.prop, order: 'asc' }
  } else if (sortState.value.order === 'asc') {
    sortState.value = { prop: col.prop, order: 'desc' }
  } else {
    sortState.value = { prop: col.prop, order: null }
  }
}

function handleRowClick(row: any, index: number) {
  currentRowIndex.value = index
  emit('row-click', row, index)
}

provide(tableContextKey, { registerColumn })

function colWidthStyle(col: ColumnInfo): CSSProperties | undefined {
  if (col.width) {
    const w = typeof col.width === 'number' ? `${col.width}px` : col.width
    return { width: w }
  }
  return undefined
}

function fixedColStyle(col: ColumnInfo): CSSProperties | undefined {
  if (col.fixed === 'left' || col.fixed === 'right') {
    return { position: 'sticky', [col.fixed]: '0px', zIndex: 2 }
  }
  return undefined
}
</script>
