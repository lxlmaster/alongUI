import { withInstall } from '@along-ui/utils'
import Tabs from './src/tabs.vue'
import TabPane from './src/tab-pane.vue'

export const AlTabs = withInstall(Tabs)
export const AlTabPane = withInstall(TabPane)

export * from './src/tabs'
export * from './src/tab-pane'

export default AlTabs
