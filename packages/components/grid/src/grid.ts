import type { ExtractPropTypes, PropType } from 'vue'

export type GridColumns = number | Record<string, number>

export const gridProps = {
  columns: {
    type: [Number, Object] as PropType<GridColumns>,
    default: 2
  },
  template: {
    type: String,
    default: ''
  },
  rows: {
    type: String,
    default: ''
  },
  spacing: {
    type: Number,
    default: 4
  },
  align: {
    type: String,
    default: ''
  },
  justify: {
    type: String,
    default: ''
  }
} as const

export type GridProps = ExtractPropTypes<typeof gridProps>
