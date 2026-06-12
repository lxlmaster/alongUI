<template>
  <li
    class="al-sub-menu"
    :class="{
      'is-active': isActive,
      'is-disabled': disabled
    }"
    role="menuitem"
    :aria-expanded="isOpen"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="al-sub-menu__title"
      :tabindex="disabled ? -1 : 0"
      @click="handleClick"
      @keydown.enter="handleClick"
      @keydown.space.prevent="handleClick"
    >
      <slot name="title" />
      <span class="al-sub-menu__arrow" :class="{ 'is-open': isOpen }">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2L8 6L4 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
    <transition name="al-sub-menu-collapse">
      <ul
        v-show="isOpen"
        class="al-sub-menu__popup"
        :class="{ 'al-sub-menu__popup--horizontal': menuContext.mode === 'horizontal' }"
        role="menu"
      >
        <slot />
      </ul>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import { menuContextKey } from './menu'
import type { MenuContext } from './menu'
import { subMenuProps } from './sub-menu'

defineOptions({
  name: 'AlSubMenu'
})

const props = defineProps(subMenuProps)

const menuContext = inject<MenuContext>(menuContextKey)!

const isOpen = ref(false)
const isHoverOpen = ref(false)
const collapseActive = ref(false)

const isActive = computed(() => {
  return menuContext.activeIndex.value === props.index || collapseActive.value
})

function handleClick() {
  if (props.disabled) return
  if (menuContext.mode === 'vertical') {
    isOpen.value = !isOpen.value
  } else {
    isOpen.value = !isOpen.value
  }
}

function handleMouseEnter() {
  if (props.disabled) return
  if (menuContext.mode === 'horizontal') {
    isOpen.value = true
  }
}

function handleMouseLeave() {
  if (props.disabled) return
  if (menuContext.mode === 'horizontal') {
    isOpen.value = false
  }
}

watch(() => menuContext.collapse, (val) => {
  if (val) {
    isOpen.value = false
  }
})

menuContext.addSubMenu(props.index, (active: boolean) => {
  collapseActive.value = active
  if (active && menuContext.mode === 'vertical' && !menuContext.collapse) {
    isOpen.value = true
  }
})

onBeforeUnmount(() => {
  menuContext.removeSubMenu(props.index)
})
</script>
