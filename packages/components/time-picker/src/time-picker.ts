import type { ExtractPropTypes, PropType } from 'vue'

export const timePickerProps = {
  modelValue: {
    type: [String, Array] as PropType<string | [string, string]>,
    default: ''
  },
  isRange: Boolean,
  placeholder: {
    type: [String, Array] as PropType<string | [string, string]>,
    default: undefined
  },
  disabled: Boolean,
  clearable: Boolean
} as const

export const timePickerEmits = {
  'update:modelValue': (_value: string | [string, string] | undefined | '') => true,
  change: (_value: string | [string, string] | undefined | '') => true
}

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>
