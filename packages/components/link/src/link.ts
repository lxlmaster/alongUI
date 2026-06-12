import type { ExtractPropTypes, PropType, Component } from 'vue'

export const linkTypes = ['default', 'primary'] as const

export type LinkType = (typeof linkTypes)[number]

export const linkProps = {
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: '_self'
  },
  type: {
    type: String as PropType<LinkType>,
    default: 'default',
    validator: (value: LinkType) => linkTypes.includes(value)
  },
  underline: {
    type: Boolean,
    default: true
  },
  disabled: Boolean,
  icon: {
    type: [Object, Function] as PropType<Component>
  }
} as const

export const linkEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent
}

export type LinkProps = ExtractPropTypes<typeof linkProps>
export type LinkEmits = typeof linkEmits
