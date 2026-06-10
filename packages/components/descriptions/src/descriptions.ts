import type { ExtractPropTypes } from 'vue'

export const descriptionsProps = {
  title: {
    type: String,
    default: ''
  },
  column: {
    type: Number,
    default: 2
  },
  border: {
    type: Boolean,
    default: false
  }
} as const

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>
