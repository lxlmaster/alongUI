import type { ExtractPropTypes, PropType } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export const selectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
    default: undefined
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => []
  },
  multiple: Boolean,
  disabled: Boolean,
  clearable: Boolean,
  filterable: Boolean,
  allowCreate: Boolean,
  collapseTags: Boolean,
  placeholder: {
    type: String,
    default: '请选择'
  },
  loading: Boolean,
  remote: Boolean
} as const

export const selectEmits = {
  'update:modelValue': (
    value: string | number | Array<string | number> | undefined
  ) =>
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    Array.isArray(value),
  change: (value: string | number | Array<string | number> | undefined) =>
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    Array.isArray(value),
  visibleChange: (visible: boolean) => typeof visible === 'boolean'
}

export type SelectProps = ExtractPropTypes<typeof selectProps>

