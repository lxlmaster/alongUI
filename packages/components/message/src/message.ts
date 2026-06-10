import type { VNode } from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export interface MessageOptions {
  /** Message content */
  message?: string | VNode
  /** Message type */
  type?: MessageType
  /** Duration in ms, 0 means no auto-close */
  duration?: number
  /** Whether to show close button */
  showClose?: boolean
  /** Callback when message closes */
  onClose?: () => void
}

export interface MessageHandler {
  /** Close the message instance */
  close: () => void
}

export type MessageParams = string | MessageOptions

export function normalizeOptions(params: MessageParams): MessageOptions {
  if (typeof params === 'string') {
    return { message: params }
  }
  return params
}
