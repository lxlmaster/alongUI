import type { ExtractPropTypes, PropType } from 'vue'

export interface GuideStep {
  title: string
  content: string
  selector?: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  beforeEnter?: () => void | Promise<void>
  beforeLeave?: () => void | Promise<void>
}

export const guideProps = {
  steps: {
    type: Array as PropType<GuideStep[]>,
    required: true
  },
  modelValue: {
    type: Number,
    default: 0
  },
  showMask: {
    type: Boolean,
    default: true
  },
  maskColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.5)'
  },
  scrollToStep: {
    type: Boolean,
    default: true
  },
  doneLabel: {
    type: String,
    default: '完成'
  },
  nextLabel: {
    type: String,
    default: '下一步'
  },
  prevLabel: {
    type: String,
    default: '上一步'
  },
  closeable: {
    type: Boolean,
    default: true
  }
} as const

export type GuideProps = ExtractPropTypes<typeof guideProps>
