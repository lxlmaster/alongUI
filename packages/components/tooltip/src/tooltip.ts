import type { ExtractPropTypes, PropType } from 'vue'

export const tooltipPlacements = ['top', 'bottom', 'left', 'right'] as const
export const tooltipTriggers = ['hover', 'click', 'focus'] as const

export type TooltipPlacement = (typeof tooltipPlacements)[number]
export type TooltipTrigger = (typeof tooltipTriggers)[number]

export const tooltipProps = {
  content: String,
  placement: {
    type: String as PropType<TooltipPlacement>,
    default: 'top',
    validator: (value: TooltipPlacement) => tooltipPlacements.includes(value)
  },
  trigger: {
    type: String as PropType<TooltipTrigger>,
    default: 'hover',
    validator: (value: TooltipTrigger) => tooltipTriggers.includes(value)
  },
  disabled: Boolean
} as const

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

