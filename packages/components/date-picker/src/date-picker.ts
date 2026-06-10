import type { ExtractPropTypes, PropType } from 'vue'

export type DatePickerType = 'date' | 'daterange' | 'datetime' | 'month'

export const datePickerProps = {
  modelValue: {
    type: [String, Date, Array] as PropType<string | Date | [string, string]>,
    default: ''
  },
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date',
    validator: (v: DatePickerType) => ['date', 'daterange', 'datetime', 'month'].includes(v)
  },
  placeholder: {
    type: [String, Array] as PropType<string | [string, string]>,
    default: undefined
  },
  disabled: Boolean,
  clearable: Boolean
} as const

export const datePickerEmits = {
  'update:modelValue': (_value: string | Date | [string, string] | undefined) => true,
  change: (_value: string | Date | [string, string] | undefined) => true
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
