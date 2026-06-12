import { withInstall } from '@along-ui/utils'
import Steps from './src/steps.vue'
import Step from './src/step.vue'

export const AlSteps = withInstall(Steps)
export const AlStep = withInstall(Step)

export * from './src/steps'
export * from './src/step'

export default AlSteps
