import type { ExtractPropTypes, PropType } from 'vue'

export const paginationProps = {
  total: {
    type: Number,
    default: 0
  },
  current: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 50]
  },
  layout: {
    type: String,
    default: 'prev, pager, next'
  },
  disabled: Boolean,
  small: Boolean,
  background: Boolean
} as const

export const paginationEmits = {
  'update:current': (value: number) => true,
  'update:pageSize': (value: number) => true,
  'change': (current: number, pageSize: number) => true
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationEmits = typeof paginationEmits
