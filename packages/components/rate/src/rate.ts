import type { ExtractPropTypes } from 'vue'

export const rateProps = {
  modelValue: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 5
  },
  disabled: Boolean,
  allowHalf: Boolean,
  size: {
    type: Number,
    default: 24
  },
  color: {
    type: String,
    default: '#FFC107'
  },
  voidColor: {
    type: String,
    default: '#E8E8ED'
  }
} as const

export const rateEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
  change: (value: number) => typeof value === 'number'
}

export type RateProps = ExtractPropTypes<typeof rateProps>
export type RateEmits = typeof rateEmits
