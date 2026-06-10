import type { ExtractPropTypes } from 'vue'

export const headerProps = {
  height: {
    type: String,
    default: '60px'
  }
} as const

export type HeaderProps = ExtractPropTypes<typeof headerProps>
