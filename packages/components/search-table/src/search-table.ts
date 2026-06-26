import type { ExtractPropTypes, PropType } from 'vue'
import type { FormRule } from '../../form/src/form'

export interface SearchTableColumn {
  prop: string
  label: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  render?: (row: any) => any
}

export interface SearchFormField {
  prop: string
  label: string
  component?: string
  placeholder?: string
  options?: { label: string; value: any }[]
  rules?: FormRule[]
}

export const searchTableProps = {
  columns: {
    type: Array as PropType<SearchTableColumn[]>,
    required: true
  },
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },
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
  loading: {
    type: Boolean,
    default: false
  },
  searchFields: {
    type: Array as PropType<SearchFormField[]>,
    default: () => []
  },
  searchValues: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  stripe: Boolean,
  border: Boolean,
  maxHeight: {
    type: [String, Number] as PropType<string | number>
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100]
  }
} as const

export type SearchTableProps = ExtractPropTypes<typeof searchTableProps>
