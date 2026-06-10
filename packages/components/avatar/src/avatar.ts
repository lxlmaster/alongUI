import type { ExtractPropTypes, PropType } from 'vue'

export const avatarShapes = ['circle', 'square'] as const
export const avatarSizes = ['small', 'default', 'large'] as const

export type AvatarShape = (typeof avatarShapes)[number]
export type AvatarSize = (typeof avatarSizes)[number] | number

export const avatarProps = {
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String] as PropType<AvatarSize>,
    default: 'default'
  },
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'circle',
    validator: (value: AvatarShape) => avatarShapes.includes(value)
  }
} as const

export const avatarEmits = {
  error: (event: Event) => event instanceof Event
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
export type AvatarEmits = typeof avatarEmits
