import '@along-ui/theme'
import '@along-ui/components/style/index.scss'
import { makeInstaller } from '@along-ui/utils'
import { AlButton, AlButtonGroup } from '@along-ui/components'

export * from '@along-ui/components'
export * from '@along-ui/hooks'
export * from '@along-ui/icons'

const components = [AlButton, AlButtonGroup]
const installer = makeInstaller(components)

export default installer
