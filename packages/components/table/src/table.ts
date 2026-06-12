import type { Component, ExtractPropTypes, InjectionKey, PropType, Slot } from 'vue'

export const tableSizes = ['small', 'default', 'large'] as const
export type TableSize = (typeof tableSizes)[number]

export interface SortState {
  prop: string | null
  order: 'asc' | 'desc' | null
}

export interface ColumnInfo {
  id: string
  prop?: string
  label?: string
  width?: string | number
  fixed?: 'left' | 'right'
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  renderSlot?: any
}

export interface TableContext {
  registerColumn: (column: ColumnInfo, slot?: any) => void
  slots: Map<string, any>
}

export const tableContextKey: InjectionKey<TableContext> = Symbol('tableContext')

export const tableProps = {
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  stripe: Boolean,
  border: Boolean,
  size: {
    type: String as PropType<TableSize>,
    default: 'default',
    validator: (v: TableSize) => tableSizes.includes(v)
  },
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  loading: Boolean,
  highlightCurrentRow: Boolean,
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  rowKey: {
    type: String,
    default: undefined
  }
} as const

export const tableEmits = {
  'row-click': (_row: any, _index: number) => true
}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableEmits = typeof tableEmits
