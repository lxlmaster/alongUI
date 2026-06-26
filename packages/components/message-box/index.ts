import { withInstall } from '@along-ui/utils'
import MessageBoxVue from './src/message-box.vue'
import { AlMessageBox as messageBoxApi } from './src/message-box'

export const AlMessageBoxComponent = withInstall(MessageBoxVue)

export const AlMessageBox = messageBoxApi

/** @deprecated Use AlMessageBox instead */
export const ElMessageBox = messageBoxApi

export * from './src/message-box'
export default AlMessageBox
