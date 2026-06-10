import type { ExtractPropTypes, PropType } from 'vue'

export const breadcrumbItemProps = {
  to: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: undefined
  }
} as const

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>
