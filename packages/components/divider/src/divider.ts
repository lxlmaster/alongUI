import type { ExtractPropTypes, PropType } from 'vue'

export const dividerContentPositions = ['left', 'center', 'right'] as const

export type DividerContentPosition = (typeof dividerContentPositions)[number]

export const dividerProps = {
  dashed: Boolean,
  contentPosition: {
    type: String as PropType<DividerContentPosition>,
    default: 'center',
    validator: (value: DividerContentPosition) => dividerContentPositions.includes(value)
  }
} as const

export type DividerProps = ExtractPropTypes<typeof dividerProps>
