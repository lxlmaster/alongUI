import type { ExtractPropTypes } from 'vue'

export const footerProps = {
  height: {
    type: String,
    default: '60px'
  }
} as const

export type FooterProps = ExtractPropTypes<typeof footerProps>
