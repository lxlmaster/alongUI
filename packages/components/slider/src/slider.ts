import type { ExtractPropTypes } from 'vue'

export const sliderProps = {
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  disabled: Boolean,
  showTooltip: {
    type: Boolean,
    default: true
  }
} as const

export const sliderEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
  change: (value: number) => typeof value === 'number'
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderEmits = typeof sliderEmits
