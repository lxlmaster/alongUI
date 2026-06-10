import type { ExtractPropTypes } from 'vue'

export const affixProps = {
  offset: {
    type: Number,
    default: 0
  },
  target: {
    type: String,
    default: ''
  }
} as const

export const affixEmits = {
  scroll: (value: { scrollTop: number; fixed: boolean }) => true,
  change: (fixed: boolean) => true
}

export type AffixProps = ExtractPropTypes<typeof affixProps>
export type AffixEmits = typeof affixEmits
