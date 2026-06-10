import type { ExtractPropTypes } from 'vue'

export const asideProps = {
  width: {
    type: String,
    default: '200px'
  }
} as const

export type AsideProps = ExtractPropTypes<typeof asideProps>
