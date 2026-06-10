import type { ExtractPropTypes, PropType } from 'vue'

export const imageFit = ['cover', 'contain', 'fill', 'none'] as const
export type ImageFit = (typeof imageFit)[number]

export const imageProps = {
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  fit: {
    type: String as PropType<ImageFit>,
    default: 'cover'
  },
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => []
  }
} as const

export type ImageProps = ExtractPropTypes<typeof imageProps>
