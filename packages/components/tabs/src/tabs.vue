<template>
  <div
    class="al-tabs"
    :class="[
      `al-tabs--${tabPosition}`,
      `al-tabs--${type}`
    ]"
  >
    <div
      class="al-tabs__header"
      :class="`al-tabs__header--${tabPosition}`"
    >
      <div class="al-tabs__nav-wrap">
        <div class="al-tabs__nav" ref="navRef">
          <div
            v-for="pane in panes"
            :key="pane.name"
            class="al-tabs__item"
            :class="[
              `al-tabs__item--${type}`,
              {
                'is-active': currentName === pane.name,
                'is-disabled': pane.disabled,
                'is-closable': paneClosable(pane)
              }
            ]"
            role="tab"
            :aria-selected="currentName === pane.name"
            :tabindex="pane.disabled ? -1 : 0"
            @click="handleTabClick(pane)"
            @keydown.enter="handleTabClick(pane)"
          >
            <slot :name="`label-${pane.name}`">
              {{ pane.label }}
            </slot>
            <span
              v-if="paneClosable(pane)"
              class="al-tabs__close"
              @click.stop="handleRemove(pane)"
              role="button"
              tabindex="0"
              aria-label="Close tab"
              @keydown.enter.stop="handleRemove(pane)"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </span>
          </div>
          <div
            v-if="addable"
            class="al-tabs__add-btn"
            @click="handleAdd"
            role="button"
            tabindex="0"
            aria-label="Add tab"
            @keydown.enter="handleAdd"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div
            v-if="type === 'line'"
            class="al-tabs__active-bar"
            :class="`al-tabs__active-bar--${tabPosition}`"
            :style="activeBarStyle"
          />
        </div>
      </div>
    </div>
    <div class="al-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, provide, ref, watch } from 'vue'
import { tabsContextKey, tabsEmits, tabsProps } from './tabs'
import type { PaneInfo, TabsContext } from './tabs'

defineOptions({
  name: 'AlTabs'
})

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const navRef = ref<HTMLElement | null>(null)
const panes = ref<PaneInfo[]>([])
const currentName = ref<string | number>(props.modelValue)
const activeBarStyle = ref<Record<string, string>>({})

function paneClosable(pane: PaneInfo) {
  return pane.closable || props.closable
}

function handleTabClick(pane: PaneInfo) {
  if (pane.disabled) return
  currentName.value = pane.name
  emit('update:modelValue', pane.name)
  emit('tab-click', pane.name)
  nextTick(updateActiveBar)
}

function handleRemove(pane: PaneInfo) {
  emit('tab-remove', pane.name)
}

function handleAdd() {
  emit('tab-add')
}

function registerPane(info: PaneInfo) {
  const exists = panes.value.find(p => p.name === info.name)
  if (!exists) {
    panes.value.push(info)
  }
  if (!currentName.value && panes.value.length > 0) {
    currentName.value = panes.value[0].name
    emit('update:modelValue', currentName.value)
  }
  nextTick(updateActiveBar)
}

function unregisterPane(name: string | number) {
  panes.value = panes.value.filter(p => p.name !== name)
  if (currentName.value === name && panes.value.length > 0) {
    currentName.value = panes.value[0].name
    emit('update:modelValue', currentName.value)
  }
  nextTick(updateActiveBar)
}

function updateActiveBar() {
  if (props.type !== 'line' || !navRef.value) {
    activeBarStyle.value = {}
    return
  }
  const activeItem = navRef.value.querySelector('.al-tabs__item.is-active') as HTMLElement | null
  if (!activeItem) {
    activeBarStyle.value = {}
    return
  }
  if (props.tabPosition === 'top' || props.tabPosition === 'bottom') {
    activeBarStyle.value = {
      width: `${activeItem.offsetWidth}px`,
      transform: `translateX(${activeItem.offsetLeft}px)`
    }
  } else {
    activeBarStyle.value = {
      height: `${activeItem.offsetHeight}px`,
      transform: `translateY(${activeItem.offsetTop}px)`
    }
  }
}

watch(() => props.modelValue, (val) => {
  currentName.value = val
  nextTick(updateActiveBar)
})

onMounted(() => {
  nextTick(updateActiveBar)
})

const tabsContext: TabsContext = {
  currentName,
  type: props.type,
  closable: props.closable,
  tabPosition: props.tabPosition,
  registerPane,
  unregisterPane
}

provide(tabsContextKey, tabsContext)
</script>
