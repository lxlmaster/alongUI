import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'

export interface FormRule {
  required?: boolean
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  trigger?: 'blur' | 'change' | ''
  validator?: (rule: FormRule, value: any, callback: (error?: Error) => void) => void
}

export interface FormContext {
  model: Record<string, any>
  rules?: Record<string, FormRule[]>
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'top'
  disabled: boolean
  size: 'small' | 'default' | 'large'
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  getRules?: (prop: string) => FormRule[]
}

export interface FormItemContext {
  prop: string
  validate: (trigger?: string) => Promise<string | null>
  clearValidate: () => void
  resetField: () => void
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContext')

export const formProps = {
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  rules: {
    type: Object as PropType<Record<string, FormRule[]>>
  },
  labelWidth: {
    type: [String, Number] as PropType<string | number>
  },
  labelPosition: {
    type: String as PropType<'left' | 'right' | 'top'>,
    default: 'top'
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  },
  disabled: Boolean
} as const

export type FormProps = ExtractPropTypes<typeof formProps>
