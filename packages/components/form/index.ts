import { withInstall } from '@along-ui/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export const AlForm = withInstall(Form)
export const AlFormItem = withInstall(FormItem)

export * from './src/form'
export default AlForm
