import type { ExtractPropTypes, PropType } from 'vue'

export const popoverTriggers = ['click', 'hover', 'focus'] as const
export const popoverPlacements = ['top', 'bottom', 'left', 'right'] as const

export type PopoverTrigger = (typeof popoverTriggers)[number]
export type PopoverPlacement = (typeof popoverPlacements)[number]

export const popoverProps = {
  title: String,
  content: String,
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'click',
    validator: (v: PopoverTrigger) => popoverTriggers.includes(v)
  },
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'top',
    validator: (v: PopoverPlacement) => popoverPlacements.includes(v)
  },
  disabled: Boolean,
  width: [String, Number] as PropType<string | number>
} as const

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
