import type { ExtractPropTypes, PropType } from 'vue'

export const progressTypes = ['line', 'circle'] as const
export const progressSizes = ['small', 'default'] as const

export type ProgressType = (typeof progressTypes)[number]
export type ProgressSize = (typeof progressSizes)[number]

export const progressProps = {
  percentage: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 100
  },
  type: {
    type: String as PropType<ProgressType>,
    default: 'line',
    validator: (value: ProgressType) => progressTypes.includes(value)
  },
  strokeColor: {
    type: String,
    default: '#1D1D1F'
  },
  showInfo: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<ProgressSize>,
    default: 'default',
    validator: (value: ProgressSize) => progressSizes.includes(value)
  }
} as const

export type ProgressProps = ExtractPropTypes<typeof progressProps>
