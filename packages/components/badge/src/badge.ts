import type { ExtractPropTypes } from 'vue'

export const badgeProps = {
  value: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: Boolean,
  hidden: Boolean
} as const

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
