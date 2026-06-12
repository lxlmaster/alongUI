import type { VNode } from 'vue'

export type NotificationType = 'success' | 'warning' | 'info' | 'error'

export interface NotificationOptions {
  title?: string
  message?: string | VNode
  type?: NotificationType
  duration?: number
  showClose?: boolean
  onClose?: () => void
}

export interface NotificationHandler {
  close: () => void
}

export type NotificationParams = string | NotificationOptions

export function normalizeOptions(params: NotificationParams): NotificationOptions {
  if (typeof params === 'string') {
    return { message: params }
  }
  return params
}
