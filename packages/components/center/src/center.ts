import type { ExtractPropTypes } from 'vue'

export const centerProps = {
  both: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: String,
    default: ''
  }
} as const

export type CenterProps = ExtractPropTypes<typeof centerProps>
