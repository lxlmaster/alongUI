import { withInstall } from '@along-ui/utils'
import MessageBoxVue from './src/message-box.vue'
import { ElMessageBox } from './src/message-box'

export const AlMessageBox = withInstall(MessageBoxVue)

;(AlMessageBox as any).alert = ElMessageBox.alert
;(AlMessageBox as any).confirm = ElMessageBox.confirm
;(AlMessageBox as any).prompt = ElMessageBox.prompt

export { ElMessageBox }
export * from './src/message-box'
export default AlMessageBox
