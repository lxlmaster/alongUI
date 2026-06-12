import type { ExtractPropTypes, PropType } from 'vue'

export const videoProps = {
  src: { type: String, required: true },
  poster: String,
  autoplay: Boolean,
  controls: { type: Boolean, default: true },
  loop: Boolean,
  muted: Boolean,
  width: [String, Number] as PropType<string | number>,
  height: [String, Number] as PropType<string | number>,
} as const

export const videoEmits = {
  play: () => true,
  pause: () => true,
  ended: () => true,
  error: (event: Event) => event instanceof Event,
}

export type VideoProps = ExtractPropTypes<typeof videoProps>
