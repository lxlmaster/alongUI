import { withInstall } from '@along-ui/utils'
import Descriptions from './src/descriptions.vue'
import DescriptionsItem from './src/descriptions-item.vue'

export const AlDescriptions = withInstall(Descriptions)
export const AlDescriptionsItem = withInstall(DescriptionsItem)

export * from './src/descriptions'
export * from './src/descriptions-item'
export default AlDescriptions
