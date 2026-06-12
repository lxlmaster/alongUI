import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'

export const tabsType = ['line', 'card'] as const
export type TabsType = (typeof tabsType)[number]

export const tabPosition = ['top', 'bottom', 'left', 'right'] as const
export type TabPosition = (typeof tabPosition)[number]

export const tabsProps = {
  type: {
    type: String as PropType<TabsType>,
    default: 'line'
  },
  closable: {
    type: Boolean,
    default: false
  },
  addable: {
    type: Boolean,
    default: false
  },
  tabPosition: {
    type: String as PropType<TabPosition>,
    default: 'top'
  },
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  }
} as const

export const tabsEmits = {
  'update:modelValue': (val: string | number) => true,
  'tab-remove': (name: string | number) => true,
  'tab-add': () => true,
  'tab-click': (name: string | number) => true
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsEmits = typeof tabsEmits

export interface PaneInfo {
  name: string | number
  label: string
  disabled: boolean
  closable: boolean
}

export interface TabsContext {
  currentName: Ref<string | number>
  type: TabsType
  closable: boolean
  tabPosition: TabPosition
  registerPane: (info: PaneInfo) => void
  unregisterPane: (name: string | number) => void
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('tabsContext')
