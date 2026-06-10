<template>
  <span
    class="al-popover"
    :class="`al-popover--${placement}`"
    @mouseenter="handleOpen('hover')"
    @mouseleave="handleClose('hover')"
    @focusin="handleOpen('focus')"
    @focusout="handleClose('focus')"
  >
    <!-- Trigger slot or default -->
    <span
      ref="triggerRef"
      class="al-popover__trigger"
      :aria-describedby="visible ? popoverId : undefined"
      @click="handleClick"
    >
      <slot name="reference">
        <slot />
      </slot>
    </span>

    <!-- Popover panel -->
    <transition name="al-popover-fade">
      <div
        v-if="visible"
        :id="popoverId"
        ref="popoverRef"
        class="al-popover__panel"
        :style="panelStyle"
        role="dialog"
        @click.stop
      >
        <!-- Arrow -->
        <div class="al-popover__arrow" />

        <!-- Title -->
        <div v-if="title" class="al-popover__title">{{ title }}</div>

        <!-- Content -->
        <div class="al-popover__content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </transition>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, nextTick } from 'vue'
import { popoverProps } from './popover'

defineOptions({
  name: 'AlPopover'
})

const props = defineProps(popoverProps)

const visible = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const popoverId = `al-popover-${Math.random().toString(36).slice(2, 10)}`

let hoverTimer: ReturnType<typeof setTimeout> | null = null
let leaveTimer: ReturnType<typeof setTimeout> | null = null

// Listen for outside clicks
function handleDocumentClick(event: MouseEvent) {
  if (!visible.value) return
  const target = event.target as Node
  const popoverEl = popoverRef.value
  const triggerEl = triggerRef.value

  if (
    popoverEl &&
    !popoverEl.contains(target) &&
    triggerEl &&
    !triggerEl.contains(target)
  ) {
    visible.value = false
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleDocumentClick)
  if (hoverTimer) clearTimeout(hoverTimer)
  if (leaveTimer) clearTimeout(leaveTimer)
})

const panelStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  return style
})

function handleOpen(trigger: string) {
  if (props.disabled) return

  if (trigger === 'hover' && props.trigger === 'hover') {
    if (leaveTimer) clearTimeout(leaveTimer)
    hoverTimer = setTimeout(() => {
      visible.value = true
      registerClickOutside()
    }, 100)
  } else if (trigger === 'focus' && props.trigger === 'focus') {
    visible.value = true
    registerClickOutside()
  }
}

function handleClose(trigger: string) {
  if (trigger === 'hover' && props.trigger === 'hover') {
    if (hoverTimer) clearTimeout(hoverTimer)
    leaveTimer = setTimeout(() => {
      visible.value = false
      unregisterClickOutside()
    }, 200)
  } else if (trigger === 'focus' && props.trigger === 'focus') {
    // Close on focus out is handled by delay but keep open for focus within popover
  }
}

function handleClick() {
  if (props.disabled) return
  if (props.trigger !== 'click') return

  visible.value = !visible.value
  if (visible.value) {
    registerClickOutside()
  } else {
    unregisterClickOutside()
  }
}

function registerClickOutside() {
  nextTick(() => {
    document.addEventListener('mousedown', handleDocumentClick)
  })
}

function unregisterClickOutside() {
  document.removeEventListener('mousedown', handleDocumentClick)
}
</script>
