import type { Directive } from 'vue'
import { attachLoading, detachLoading } from './dom'

export const vLoading: Directive<HTMLElement, boolean> = {
  mounted(el, binding) {
    if (binding.value) {
      attachLoading(el)
    }
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) {
      return
    }

    if (binding.value) {
      attachLoading(el)
    } else {
      detachLoading(el)
    }
  },
  unmounted(el) {
    detachLoading(el)
  }
}

