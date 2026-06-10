import type { ExtractPropTypes, PropType } from 'vue'

export type DropdownTrigger = 'hover' | 'click'
export type DropdownPlacement = 'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end'

export const dropdownProps = {
  trigger: {
    type: String as PropType<DropdownTrigger>,
    default: 'hover',
    validator: (v: DropdownTrigger) => ['hover', 'click'].includes(v)
  },
  placement: {
    type: String as PropType<DropdownPlacement>,
    default: 'bottom-start',
    validator: (v: DropdownPlacement) =>
      ['bottom', 'bottom-start', 'bottom-end', 'top', 'top-start', 'top-end'].includes(v)
  }
} as const

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
