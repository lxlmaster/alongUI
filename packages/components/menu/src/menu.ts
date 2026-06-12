import type { ComputedRef, ExtractPropTypes, InjectionKey, PropType } from 'vue'

export const menuMode = ['vertical', 'horizontal'] as const
export type MenuMode = (typeof menuMode)[number]

export const menuProps = {
  mode: {
    type: String as PropType<MenuMode>,
    default: 'vertical'
  },
  defaultActive: {
    type: String,
    default: ''
  },
  collapse: {
    type: Boolean,
    default: false
  },
  router: {
    type: Boolean,
    default: false
  }
} as const

export const menuEmits = {
  select: (index: string, indexPath: string[]) => typeof index === 'string'
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuEmits = typeof menuEmits

export interface MenuContext {
  activeIndex: ComputedRef<string>
  mode: MenuMode
  collapse: boolean
  router: boolean
  handleMenuItemClick: (index: string) => void
  handleSubMenuClick: (index: string) => void
  addSubMenu: (index: string, updateActive: (active: boolean) => void) => void
  removeSubMenu: (index: string) => void
}

export const menuContextKey: InjectionKey<MenuContext> = Symbol('menuContext')
