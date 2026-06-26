import type { ExtractPropTypes, PropType } from 'vue'

export const drawerDirections = ['rtl', 'ltr', 'ttb', 'btt'] as const

export type DrawerDirection = (typeof drawerDirections)[number]

export const drawerProps = {
  modelValue: Boolean,
  title: {
    type: String,
    default: ''
  },
  direction: {
    type: String as PropType<DrawerDirection>,
    default: 'rtl' as DrawerDirection,
    validator: (v: DrawerDirection) => drawerDirections.includes(v)
  },
  size: {
    type: String,
    default: '30%'
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 2500
  }
} as const

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
