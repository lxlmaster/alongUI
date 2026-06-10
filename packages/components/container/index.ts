import { withInstall } from '@along-ui/utils'
import Container from './src/container.vue'
import Header from './src/header.vue'
import Aside from './src/aside.vue'
import Main from './src/main.vue'
import Footer from './src/footer.vue'

export const AlContainer = withInstall(Container)
export const AlHeader = withInstall(Header)
export const AlAside = withInstall(Aside)
export const AlMain = withInstall(Main)
export const AlFooter = withInstall(Footer)

export * from './src/header'
export * from './src/aside'
export * from './src/footer'

export default AlContainer
