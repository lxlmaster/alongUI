import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'

export interface CheckboxContext {
  modelValue: Ref<(string | number | boolean)[]>
  disabled: Ref<boolean>
  toggleValue: (value: string | number | boolean) => void
}

export const checkboxGroupKey: InjectionKey<CheckboxContext> = Symbol('checkboxGroup')

export const checkboxProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false
  },
  label: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean
} as const

export const checkboxEmits = {
  'update:modelValue': (value: string | number | boolean) => true,
  change: (value: string | number | boolean) => true
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxEmits = typeof checkboxEmits

export const checkboxGroupProps = {
  modelValue: {
    type: Array as PropType<(string | number | boolean)[]>,
    default: () => []
  },
  disabled: Boolean,
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  }
} as const

export const checkboxGroupEmits = {
  'update:modelValue': (value: (string | number | boolean)[]) => true,
  change: (value: (string | number | boolean)[]) => true
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
