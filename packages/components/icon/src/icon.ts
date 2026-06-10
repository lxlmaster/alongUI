import type { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  size: {
    type: [Number, String] as PropType<number | string>
  },
  color: String
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>

