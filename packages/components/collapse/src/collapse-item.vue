<template>
  <div class="al-collapse-item" :class="{ 'is-disabled': disabled }">
    <div
      class="al-collapse-item__header"
      :class="{ 'is-active': isActive }"
      role="button"
      :tabindex="disabled ? -1 : 0"
      @click="handleClick"
      @keydown.enter="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <span class="al-collapse-item__arrow" :class="{ 'is-active': isActive }">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2L8 6L4 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
    <transition name="al-collapse-slide">
      <div v-show="isActive" class="al-collapse-item__body">
        <div class="al-collapse-item__content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { collapseContextKey } from './collapse'
import { collapseItemProps } from './collapse-item'

defineOptions({
  name: 'AlCollapseItem'
})

const props = defineProps(collapseItemProps)
const collapseContext = inject(collapseContextKey)

const itemName = computed(() => props.name || props.title)

const isActive = computed(() => {
  if (!collapseContext) return false
  const active = collapseContext.activeNames
  if (collapseContext.accordion) {
    return active === itemName.value
  }
  return Array.isArray(active) && active.includes(itemName.value)
})

function handleClick() {
  if (props.disabled || !collapseContext) return
  collapseContext.handleItemClick(itemName.value)
}
</script>
