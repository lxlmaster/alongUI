import { withInstall } from '@along-ui/utils'
import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import SubMenu from './src/sub-menu.vue'

export const AlMenu = withInstall(Menu)
export const AlMenuItem = withInstall(MenuItem)
export const AlSubMenu = withInstall(SubMenu)

export * from './src/menu'
export * from './src/menu-item'
export * from './src/sub-menu'

export default AlMenu
