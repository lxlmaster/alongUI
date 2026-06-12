import type { ExtractPropTypes, PropType } from 'vue'

export const collapseItemProps = {
  title: {
    type: String,
    default: ''
  },
  name: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
