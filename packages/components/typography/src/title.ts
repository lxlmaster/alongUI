import type { ExtractPropTypes } from 'vue'

export const titleProps = {
  level: {
    type: Number,
    default: 1,
    validator: (value: number) => [1, 2, 3, 4].includes(value)
  }
} as const

export type TitleProps = ExtractPropTypes<typeof titleProps>
