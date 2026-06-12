import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'

export type CollapseModelValue = string | number | (string | number)[]

export const collapseProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<CollapseModelValue>,
    default: ''
  },
  accordion: {
    type: Boolean,
    default: false
  }
} as const

export const collapseEmits = {
  'update:modelValue': (val: CollapseModelValue) => true,
  'change': (val: CollapseModelValue) => true
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseEmits = typeof collapseEmits

export interface CollapseContext {
  activeNames: CollapseModelValue
  accordion: boolean
  handleItemClick: (name: string | number) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContext')
