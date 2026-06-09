import type { Component, ExtractPropTypes, PropType } from 'vue'

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
export const buttonSizes = ['small', 'default', 'large'] as const
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export type ButtonType = (typeof buttonTypes)[number]
export type ButtonSize = (typeof buttonSizes)[number]
export type ButtonNativeType = (typeof buttonNativeTypes)[number]

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
    validator: (value: ButtonType) => buttonTypes.includes(value)
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default',
    validator: (value: ButtonSize) => buttonSizes.includes(value)
  },
  plain: Boolean,
  round: Boolean,
  circle: Boolean,
  loading: Boolean,
  disabled: Boolean,
  icon: {
    type: [Object, Function] as PropType<Component>
  },
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
    validator: (value: ButtonNativeType) => buttonNativeTypes.includes(value)
  },
  autofocus: Boolean
} as const

export const buttonEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

