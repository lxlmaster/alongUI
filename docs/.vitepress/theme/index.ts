import DefaultTheme from 'vitepress/theme'
import AlongUI from '../../../packages/along-ui/src/index'
import '../../../packages/theme/src/index.scss'
import '../../../packages/components/style/index.scss'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(AlongUI)
  }
}
