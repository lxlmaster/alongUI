export interface LoadingOptions {
  target?: HTMLElement | string
  text?: string
  fullscreen?: boolean
}

export interface LoadingInstance {
  close: () => void
}

