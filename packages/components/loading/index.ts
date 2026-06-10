import type { App } from 'vue'
import { LoadingService } from './src/service'
import { vLoading } from './src/directive'

export const AlLoading = {
  install(app: App) {
    app.directive('loading', vLoading)
  },
  service: LoadingService
}

export { LoadingService, vLoading }
export * from './src/types'

