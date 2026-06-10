import { onMounted, onBeforeUnmount } from 'vue'
import { isClient } from '@along-ui/utils'

export type UseClickOutsideTarget = HTMLElement | SVGElement | (() => HTMLElement | SVGElement | null) | null

export function useClickOutside(
  target: UseClickOutsideTarget,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  if (!isClient()) return

  const listener = (event: MouseEvent | TouchEvent) => {
    const element = typeof target === 'function' ? target() : target
    if (!element) return

    const targetElement = event.target as Node
    if (!targetElement) return

    if (element.contains(targetElement)) return

    handler(event)
  }

  onMounted(() => {
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', listener)
    document.removeEventListener('touchstart', listener)
  })
}
