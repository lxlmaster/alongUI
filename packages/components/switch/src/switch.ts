import type { ExtractPropTypes } from 'vue'

export const switchProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: Boolean,
  loading: Boolean,
  activeText: String,
  inactiveText: String
} as const

export const switchEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  change: (value: boolean) => typeof value === 'boolean'
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchEmits = typeof switchEmits
