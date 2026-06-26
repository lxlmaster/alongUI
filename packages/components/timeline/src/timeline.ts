import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'

export interface TimelineContext {
  reverse: boolean
  placement: 'left' | 'right' | 'alternate'
}

export const timelineContextKey: InjectionKey<TimelineContext> = Symbol('timelineContext')

export const timelineProps = {
  reverse: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<'left' | 'right' | 'alternate'>,
    default: 'left'
  }
} as const

export type TimelineProps = ExtractPropTypes<typeof timelineProps>

export const timelineItemProps = {
  timestamp: {
    type: String,
    default: ''
  },
  hideTimestamp: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<'left' | 'right'>
  },
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'info'
  },
  size: {
    type: String as PropType<'default' | 'large'>,
    default: 'default'
  },
  color: {
    type: String
  },
  icon: {
    type: [String, Object, Function] as PropType<string | Record<string, any>>
  }
} as const

export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>
