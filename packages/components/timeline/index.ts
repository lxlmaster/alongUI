import { withInstall } from '@along-ui/utils'
import Timeline from './src/timeline.vue'
import TimelineItem from './src/timeline-item.vue'

export const AlTimeline = withInstall(Timeline)
export const AlTimelineItem = withInstall(TimelineItem)

export * from './src/timeline'
export default AlTimeline
