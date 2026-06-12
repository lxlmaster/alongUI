import type { ExtractPropTypes } from 'vue'

export const menuItemProps = {
  index: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>
