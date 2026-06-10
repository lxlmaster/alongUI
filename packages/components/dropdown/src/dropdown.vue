<template>
  <div
    ref="rootRef"
    class="al-dropdown"
    :class="`al-dropdown--${placement}`"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Trigger -->
    <div
      ref="triggerRef"
      class="al-dropdown__trigger"
      :class="{ 'is-active': visible }"
      @click="handleClick"
    >
      <slot />
    </div>

    <!-- Dropdown menu -->
    <transition name="al-dropdown-fade">
      <div
        v-if="visible"
        ref="menuRef"
        class="al-dropdown__menu"
        :class="`al-dropdown__menu--${placement}`"
        @click.stop
        @mouseenter="handleMenuMouseEnter"
        @mouseleave="handleMenuMouseLeave"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { dropdownProps } from './dropdown'

defineOptions({
  name: 'AlDropdown'
})

const props = defineProps(dropdownProps)

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const visible = ref(false)

let hoverTimer: ReturnType<typeof setTimeout> | null = null
let leaveTimer: ReturnType<typeof setTimeout> | null = null

// --- Hover trigger ---
function handleMouseEnter() {
  if (props.trigger !== 'hover') return
  if (leaveTimer) clearTimeout(leaveTimer)
  hoverTimer = setTimeout(() => {
    visible.value = true
  }, 80)
}

function handleMouseLeave() {
  if (props.trigger !== 'hover') return
  if (hoverTimer) clearTimeout(hoverTimer)
  leaveTimer = setTimeout(() => {
    visible.value = false
  }, 150)
}

function handleMenuMouseEnter() {
  if (props.trigger !== 'hover') return
  if (leaveTimer) clearTimeout(leaveTimer)
}

function handleMenuMouseLeave() {
  if (props.trigger !== 'hover') return
  leaveTimer = setTimeout(() => {
    visible.value = false
  }, 150)
}

// --- Click trigger ---
function handleClick() {
  if (props.trigger !== 'click') return
  visible.value = !visible.value
  if (visible.value) {
    registerClickOutside()
  }
}

// --- Click outside ---
function handleDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    visible.value = false
  }
}

function registerClickOutside() {
  document.addEventListener('click', handleDocumentClick)
}

function unregisterClickOutside() {
  document.removeEventListener('click', handleDocumentClick)
}

watch(visible, (v) => {
  if (props.trigger === 'click') {
    if (v) registerClickOutside()
    else unregisterClickOutside()
  }
})

onBeforeUnmount(() => {
  if (hoverTimer) clearTimeout(hoverTimer)
  if (leaveTimer) clearTimeout(leaveTimer)
  unregisterClickOutside()
})

defineExpose({ visible })
</script>
