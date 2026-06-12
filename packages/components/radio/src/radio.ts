import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'

export interface RadioContext {
  modelValue: string | number | boolean
  disabled: boolean
  selectValue: (value: string | number | boolean) => void
}

export const radioGroupKey: InjectionKey<RadioContext> = Symbol('radioGroup')

export const radioProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: ''
  },
  label: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>
  },
  disabled: Boolean
} as const

export const radioEmits = {
  'update:modelValue': (value: string | number | boolean) => true,
  change: (value: string | number | boolean) => true
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits

export const radioGroupProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: ''
  },
  disabled: Boolean,
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  }
} as const

export const radioGroupEmits = {
  'update:modelValue': (value: string | number | boolean) => true,
  change: (value: string | number | boolean) => true
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupEmits = typeof radioGroupEmits
