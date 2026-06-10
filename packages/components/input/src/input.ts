import type { ExtractPropTypes, PropType } from 'vue'

export const inputTypes = ['text', 'password', 'textarea'] as const
export type InputType = (typeof inputTypes)[number]

export const inputProps = {
  modelValue: {
    type: [String, Number] as unknown as PropType<string | number>,
    default: ''
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
    validator: (value: InputType) => inputTypes.includes(value)
  },
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  clearable: Boolean,
  rows: {
    type: Number,
    default: 3
  },
  maxlength: Number,
  showWordLimit: Boolean
} as const

export const inputEmits = {
  'update:modelValue': (value: string) => typeof value === 'string',
  input: (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string',
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  blur: (event: FocusEvent) => event instanceof FocusEvent,
  clear: () => true
}

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputEmits = typeof inputEmits
