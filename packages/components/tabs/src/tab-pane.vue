<template>
  <div
    v-show="isActive"
    class="al-tab-pane"
    role="tabpanel"
    :aria-hidden="!isActive"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted } from 'vue'
import { tabsContextKey } from './tabs'
import type { TabsContext } from './tabs'
import { tabPaneProps } from './tab-pane'

defineOptions({
  name: 'AlTabPane'
})

const props = defineProps(tabPaneProps)

const tabsContext = inject<TabsContext>(tabsContextKey)!

const paneName = computed(() => props.name || tabsContext.currentName.value)
const isActive = computed(() => tabsContext.currentName.value === paneName.value)

onMounted(() => {
  tabsContext.registerPane({
    name: paneName.value,
    label: props.label,
    disabled: props.disabled,
    closable: props.closable
  })
})

onBeforeUnmount(() => {
  tabsContext.unregisterPane(paneName.value)
})
</script>
