import { withInstall } from '@along-ui/utils'
import Collapse from './src/collapse.vue'
import CollapseItem from './src/collapse-item.vue'

export const AlCollapse = withInstall(Collapse)
export const AlCollapseItem = withInstall(CollapseItem)

export * from './src/collapse'
export * from './src/collapse-item'
export default AlCollapse
