import type { ExtractPropTypes, PropType } from 'vue'

export const skeletonVariants = [
  'text',
  'title',
  'paragraph',
  'avatar',
  'image',
  'card',
  'table-row',
  'button',
  'input'
] as const

export type SkeletonVariant = (typeof skeletonVariants)[number]

export const skeletonProps = {
  loading: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String as PropType<SkeletonVariant>,
    default: 'text'
  },
  rows: {
    type: Number,
    default: 3
  },
  width: {
    type: [String, Number] as PropType<string | number>
  },
  height: {
    type: [String, Number] as PropType<string | number>
  },
  avatarSize: {
    type: [String, Number] as PropType<string | number>,
    default: 40
  },
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle'
  }
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
