import { withInstall } from '@along-ui/utils'
import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'

export const AlButton = withInstall(Button)
export const AlButtonGroup = withInstall(ButtonGroup)

export * from './src/button'
export default AlButton

