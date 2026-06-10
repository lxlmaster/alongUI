import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'

export const carouselProps = {
  interval: {
    type: Number,
    default: 4000
  },
  type: {
    type: String as PropType<'card' | ''>,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
} as const

export const carouselEmits = {
  change: (current: number) => true
}

export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselEmits = typeof carouselEmits

export interface CarouselContext {
  items: Ref<{ uid: number; active: boolean }[]>
  currentIndex: Ref<number>
  type: string
  registerItem: (uid: number) => void
  unregisterItem: (uid: number) => void
}

export const carouselContextKey: InjectionKey<CarouselContext> = Symbol('carouselContext')
