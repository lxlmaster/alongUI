import type { ExtractPropTypes, InjectionKey } from 'vue'

export const breadcrumbProps = {
  separator: {
    type: String,
    default: '/'
  }
} as const

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>

export interface BreadcrumbContext {
  separator: string
}

export const breadcrumbContextKey: InjectionKey<BreadcrumbContext> = Symbol('breadcrumbContext')
