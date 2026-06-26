import type { Directive, DirectiveBinding } from 'vue'

export interface InfiniteScrollOptions {
  distance?: number
  onLoad: () => void | Promise<void>
  disabled?: boolean
}

function handleScroll(
  el: HTMLElement,
  binding: DirectiveBinding<InfiniteScrollOptions>
) {
  const options = binding.value
  if (options?.disabled) return

  const distance = options?.distance ?? 100
  const rect = el.getBoundingClientRect()
  const scrollBottom = el.scrollHeight - el.scrollTop - el.clientHeight

  if (scrollBottom <= distance) {
    options?.onLoad?.()
  }
}

export const vInfiniteScroll: Directive<HTMLElement, InfiniteScrollOptions> = {
  mounted(el, binding) {
    el.style.overflow = 'auto'
    el.addEventListener('scroll', () => handleScroll(el, binding))
  },
  updated(el, binding) {
    // Re-check in case content size changed
    handleScroll(el, binding)
  },
  unmounted(el) {
    el.removeEventListener('scroll', () => {})
  }
}
