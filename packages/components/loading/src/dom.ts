import type { LoadingOptions } from './types'

const loadingMap = new WeakMap<HTMLElement, HTMLElement>()

export function resolveTarget(target?: HTMLElement | string) {
  if (typeof document === 'undefined') {
    return undefined
  }

  if (!target) {
    return document.body
  }

  if (typeof target === 'string') {
    return document.querySelector<HTMLElement>(target) ?? document.body
  }

  return target
}

export function createLoadingElement(options: LoadingOptions = {}) {
  const mask = document.createElement('div')
  mask.className = 'al-loading-mask'

  const spinner = document.createElement('span')
  spinner.className = 'al-loading-spinner'

  const text = document.createElement('span')
  text.className = 'al-loading-text'
  text.textContent = options.text ?? '加载中'

  mask.append(spinner, text)
  return mask
}

export function attachLoading(target: HTMLElement, options: LoadingOptions = {}) {
  if (loadingMap.has(target)) {
    return loadingMap.get(target)!
  }

  const mask = createLoadingElement(options)

  if (options.fullscreen || target === document.body) {
    mask.classList.add('is-fullscreen')
    document.body.append(mask)
  } else {
    const computedPosition = window.getComputedStyle(target).position
    if (computedPosition === 'static') {
      target.classList.add('al-loading-parent')
    }
    target.append(mask)
  }

  loadingMap.set(target, mask)
  return mask
}

export function detachLoading(target: HTMLElement) {
  const mask = loadingMap.get(target)

  if (!mask) {
    return
  }

  mask.remove()
  target.classList.remove('al-loading-parent')
  loadingMap.delete(target)
}

