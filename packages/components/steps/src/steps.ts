import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'

export const stepDirection = ['horizontal', 'vertical'] as const
export type StepDirection = (typeof stepDirection)[number]

export const stepSizes = ['small', 'default', 'large'] as const
export type StepSize = (typeof stepSizes)[number]

export const stepsProps = {
  current: {
    type: Number,
    default: 0
  },
  direction: {
    type: String as PropType<StepDirection>,
    default: 'horizontal'
  },
  size: {
    type: String as PropType<StepSize>,
    default: 'default'
  }
} as const

export const stepsEmits = {
  change: (index: number) => typeof index === 'number'
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>
export type StepsEmits = typeof stepsEmits

export interface StepsContext {
  current: number
  direction: StepDirection
  size: StepSize
  registerStep: (step: { index: number }) => number
  unregisterStep: (index: number) => void
}

export const stepsContextKey: InjectionKey<StepsContext> = Symbol('stepsContext')
