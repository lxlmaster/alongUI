import type { ExtractPropTypes, PropType } from 'vue'

export const colorPickerProps = {
  modelValue: {
    type: String,
    default: '#1D1D1F'
  },
  disabled: Boolean,
  showAlpha: Boolean,
  predefine: {
    type: Array as PropType<string[]>
  }
} as const

export const colorPickerEmits = {
  'update:modelValue': (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string'
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits
