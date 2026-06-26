import '@along-ui/theme'
import '../../components/style/index.scss'
import { makeInstaller } from '@along-ui/utils'
import { AlButton, AlButtonGroup } from '@along-ui/components'
import { AlIcon } from '@along-ui/components'
import { AlTooltip } from '@along-ui/components'
import { AlLoading } from '@along-ui/components'
import { AlInput } from '@along-ui/components'
import { AlSwitch } from '@along-ui/components'
import { AlSelect } from '@along-ui/components'
import { AlForm, AlFormItem } from '@along-ui/components'
import { AlCheckbox, AlCheckboxGroup } from '@along-ui/components'
import { AlRadio, AlRadioGroup } from '@along-ui/components'
import { AlDatePicker } from '@along-ui/components'
import { AlTimePicker } from '@along-ui/components'
import { AlUpload } from '@along-ui/components'
import { AlCascader } from '@along-ui/components'
import { AlColorPicker } from '@along-ui/components'
import { AlSlider } from '@along-ui/components'
import { AlRate } from '@along-ui/components'
import { AlTable, AlTableColumn } from '@along-ui/components'
import { AlPagination } from '@along-ui/components'
import { AlTree } from '@along-ui/components'
import { AlTag } from '@along-ui/components'
import { AlBadge } from '@along-ui/components'
import { AlProgress } from '@along-ui/components'
import { AlEmpty } from '@along-ui/components'
import { AlSkeleton } from '@along-ui/components'
import { AlCollapse, AlCollapseItem } from '@along-ui/components'
import { AlDescriptions, AlDescriptionsItem } from '@along-ui/components'
import { AlCalendar } from '@along-ui/components'
import { AlImage } from '@along-ui/components'
import { AlCarousel, AlCarouselItem } from '@along-ui/components'
import { AlVideo } from '@along-ui/components'
import { AlDialog } from '@along-ui/components'
import { AlDrawer } from '@along-ui/components'
import { AlPopover } from '@along-ui/components'
import { AlDropdown } from '@along-ui/components'
import { AlMenu, AlMenuItem, AlSubMenu } from '@along-ui/components'
import { AlTabs, AlTabPane } from '@along-ui/components'
import { AlBreadcrumb, AlBreadcrumbItem } from '@along-ui/components'
import { AlSteps, AlStep } from '@along-ui/components'
import { AlContainer, AlHeader, AlAside, AlMain, AlFooter } from '@along-ui/components'
import { AlStack } from '@along-ui/components'
import { AlGrid } from '@along-ui/components'
import { AlCenter } from '@along-ui/components'
import { AlSpacer } from '@along-ui/components'
import { AlPage } from '@along-ui/components'
import { AlDivider } from '@along-ui/components'
import { AlAvatar } from '@along-ui/components'
import { AlCard } from '@along-ui/components'
import { AlLink } from '@along-ui/components'
import { AlText, AlTitle } from '@along-ui/components'
import { AlAffix } from '@along-ui/components'
import { AlBacktop } from '@along-ui/components'
import { AlResult } from '@along-ui/components'
import { AlTimeline, AlTimelineItem } from '@along-ui/components'
import { AlGuide } from '@along-ui/components'
import { AlSearchTable } from '@along-ui/components'
import { vInfiniteScroll } from '@along-ui/components'

export * from '@along-ui/components'
export * from '@along-ui/hooks'
export * from '@along-ui/icons'

const components = [
  AlButton, AlButtonGroup, AlIcon, AlTooltip, AlLoading,
  AlInput, AlSwitch, AlSelect,
  AlForm, AlFormItem, AlCheckbox, AlCheckboxGroup, AlRadio, AlRadioGroup,
  AlDatePicker, AlTimePicker, AlUpload, AlCascader, AlColorPicker, AlSlider, AlRate,
  AlTable, AlTableColumn, AlPagination, AlTree,
  AlTag, AlBadge, AlProgress, AlEmpty, AlSkeleton,
  AlCollapse, AlCollapseItem, AlDescriptions, AlDescriptionsItem,
  AlCalendar, AlImage, AlCarousel, AlCarouselItem, AlVideo,
  AlDialog, AlDrawer, AlPopover, AlDropdown,
  AlMenu, AlMenuItem, AlSubMenu, AlTabs, AlTabPane,
  AlBreadcrumb, AlBreadcrumbItem, AlSteps, AlStep,
  AlContainer, AlHeader, AlAside, AlMain, AlFooter,
  AlStack, AlGrid, AlCenter, AlSpacer, AlPage, AlDivider,
  AlAvatar, AlCard, AlLink, AlText, AlTitle, AlAffix, AlBacktop,
  AlResult, AlTimeline, AlTimelineItem, AlGuide, AlSearchTable,
]

const installer = makeInstaller(components)

export default installer
