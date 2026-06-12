import type { ExtractPropTypes, PropType } from 'vue'

export const textTypes = ['primary', 'secondary', 'disabled'] as const

export type TextType = (typeof textTypes)[number]

export const textProps = {
  type: {
    type: String as PropType<TextType>,
    default: 'primary',
    validator: (value: TextType) => textTypes.includes(value)
  },
  truncated: Boolean
} as const

export type TextProps = ExtractPropTypes<typeof textProps>
