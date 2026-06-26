import type { ExtractPropTypes, PropType } from 'vue'

export const resultStatuses = ['success', 'error', 'warning', 'info', '403', '404', '500'] as const

export type ResultStatus = (typeof resultStatuses)[number]

export const resultProps = {
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  status: {
    type: String as PropType<ResultStatus>,
    default: 'info'
  },
  icon: {
    type: [String, Object, Function] as PropType<string | Record<string, any>>
  }
} as const

export type ResultProps = ExtractPropTypes<typeof resultProps>
