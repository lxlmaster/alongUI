import type { ExtractPropTypes } from 'vue'

export const dropdownItemProps = {
  label: {
    type: String,
    default: ''
  },
  disabled: Boolean,
  divided: Boolean,
  command: {
    type: [String, Number] as unknown as import('vue').PropType<string | number>,
    default: undefined
  }
} as const

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
