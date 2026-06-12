import type { ExtractPropTypes, PropType } from 'vue'

export const tabPaneProps = {
  label: {
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
  },
  closable: {
    type: Boolean,
    default: false
  }
} as const

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>
