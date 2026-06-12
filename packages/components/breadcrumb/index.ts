import { withInstall } from '@along-ui/utils'
import Breadcrumb from './src/breadcrumb.vue'
import BreadcrumbItem from './src/breadcrumb-item.vue'

export const AlBreadcrumb = withInstall(Breadcrumb)
export const AlBreadcrumbItem = withInstall(BreadcrumbItem)

export * from './src/breadcrumb'
export * from './src/breadcrumb-item'

export default AlBreadcrumb
