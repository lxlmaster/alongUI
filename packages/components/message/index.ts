import { withInstall } from '@along-ui/utils'
import MessageVue from './src/message.vue'
import { Message } from './src/index'

export const AlMessage = withInstall(MessageVue)

// Attach command API to the component for convenience
;(AlMessage as any).success = Message.success
;(AlMessage as any).warning = Message.warning
;(AlMessage as any).info = Message.info
;(AlMessage as any).error = Message.error

export { Message }
export type { MessageOptions, MessageType, MessageHandler, MessageParams } from './src/message'
export default AlMessage
