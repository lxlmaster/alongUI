import type { ExtractPropTypes } from 'vue'

export const stepProps = {
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  }
} as const

export type StepProps = ExtractPropTypes<typeof stepProps>
