import type { ExtractPropTypes } from 'vue'

export const subMenuProps = {
  index: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>
