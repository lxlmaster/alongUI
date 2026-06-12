import type { ExtractPropTypes, PropType } from 'vue'

export const tagTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
export const tagSizes = ['small', 'default', 'large'] as const
export const tagEffects = ['dark', 'light', 'plain'] as const

export type TagType = (typeof tagTypes)[number]
export type TagSize = (typeof tagSizes)[number]
export type TagEffect = (typeof tagEffects)[number]

export const tagProps = {
  type: {
    type: String as PropType<TagType>,
    default: 'default',
    validator: (value: TagType) => tagTypes.includes(value)
  },
  closable: Boolean,
  hit: Boolean,
  effect: {
    type: String as PropType<TagEffect>,
    default: 'light',
    validator: (value: TagEffect) => tagEffects.includes(value)
  },
  size: {
    type: String as PropType<TagSize>,
    default: 'default',
    validator: (value: TagSize) => tagSizes.includes(value)
  }
} as const

export const tagEmits = {
  close: (event: MouseEvent) => event instanceof MouseEvent
}

export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagEmits = typeof tagEmits
