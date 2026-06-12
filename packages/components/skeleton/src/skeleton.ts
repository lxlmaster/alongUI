import type { ExtractPropTypes } from 'vue'

export const skeletonProps = {
  loading: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  }
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
