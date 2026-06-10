import type { ExtractPropTypes, PropType } from 'vue'

export interface CascaderOption {
  label: string
  value: string | number
  children?: CascaderOption[]
  disabled?: boolean
}

export const cascaderProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
} as const

export const cascaderEmits = {
  'update:modelValue': (val: string | number) => true,
  'change': (val: string | number) => true
}

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
export type CascaderEmits = typeof cascaderEmits
