import DefaultTheme from 'vitepress/theme'
import AlongUI from 'along-ui'
import '@along-ui/theme'
import '@along-ui/components/style'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(AlongUI)
  }
}
