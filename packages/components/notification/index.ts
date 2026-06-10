import { withInstall } from '@along-ui/utils'
import NotificationVue from './src/notification.vue'
import { Notification } from './src/index'

export const AlNotification = withInstall(NotificationVue)

;(AlNotification as any).success = Notification.success
;(AlNotification as any).warning = Notification.warning
;(AlNotification as any).info = Notification.info
;(AlNotification as any).error = Notification.error

export { Notification }
export type {
  NotificationOptions,
  NotificationType,
  NotificationHandler,
  NotificationParams
} from './src/notification'
export default AlNotification
