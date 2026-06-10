import '@along-ui/theme'
import '../../components/style/index.scss'
import { makeInstaller } from '@along-ui/utils'
import { AlButton, AlButtonGroup, AlIcon, AlInput, AlLoading, AlTooltip } from '@along-ui/components'

export * from '@along-ui/components'
export * from '@along-ui/hooks'
export * from '@along-ui/icons'

const components = [AlButton, AlButtonGroup, AlIcon, AlTooltip, AlLoading, AlInput]
const installer = makeInstaller(components)

export default installer
