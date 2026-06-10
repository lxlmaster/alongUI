import { attachLoading, detachLoading, resolveTarget } from './dom'
import type { LoadingInstance, LoadingOptions } from './types'

export function LoadingService(options: LoadingOptions = {}): LoadingInstance {
  const target = resolveTarget(options.target)

  if (!target) {
    return {
      close: () => undefined
    }
  }

  attachLoading(target, {
    ...options,
    fullscreen: options.fullscreen ?? target === document.body
  })

  return {
    close: () => detachLoading(target)
  }
}

