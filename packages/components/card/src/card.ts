import type { ExtractPropTypes, PropType } from 'vue'

export const cardShadows = ['always', 'hover', 'never'] as const

export type CardShadow = (typeof cardShadows)[number]

export const cardProps = {
  header: {
    type: String,
    default: ''
  },
  shadow: {
    type: String as PropType<CardShadow>,
    default: 'always',
    validator: (value: CardShadow) => cardShadows.includes(value)
  }
} as const

export type CardProps = ExtractPropTypes<typeof cardProps>
