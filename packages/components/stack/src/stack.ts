import type { ExtractPropTypes, PropType } from 'vue'

export const stackProps = {
  direction: {
    type: String as PropType<'row' | 'column'>,
    default: 'row'
  },
  spacing: {
    type: Number,
    default: 4
  },
  wrap: {
    type: Boolean,
    default: false
  },
  distributed: {
    type: Boolean,
    default: false
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

export type StackProps = ExtractPropTypes<typeof stackProps>
