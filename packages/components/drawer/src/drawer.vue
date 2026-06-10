<template>
  <Teleport to="body">
    <transition name="al-drawer-fade" @after-leave="handleAfterLeave" @after-enter="handleAfterEnter">
      <div
        v-if="shouldRender"
        ref="overlayRef"
        class="al-drawer-overlay"
        :style="{ zIndex }"
        @mousedown="handleOverlayClick"
      >
        <div
          ref="drawerRef"
          class="al-drawer"
          :class="[
            `al-drawer--${direction}`,
            { 'al-drawer--open': isOpen }
          ]"
          :style="drawerStyle"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          tabindex="-1"
          @click.stop
        >
          <!-- Header -->
          <div v-if="withHeader" class="al-drawer__header">
            <span class="al-drawer__title">{{ title }}</span>
            <button
              v-if="showClose"
              class="al-drawer__close"
              aria-label="Close"
              @click="handleClose"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="al-drawer__body">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useScrollLock } from '@along-ui/hooks'
import { drawerProps, type DrawerDirection } from './drawer'

defineOptions({
  name: 'AlDrawer'
})

const props = defineProps(drawerProps)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  opened: []
  closed: []
}>()

const overlayRef = ref<HTMLElement | null>(null)
const drawerRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const isMounted = ref(false)

const shouldRender = computed(() => {
  if (props.destroyOnClose) return isMounted.value
  return isMounted.value || isOpen.value
})

const drawerStyle = computed(() => {
  const style: Record<string, string> = {}

  const direction = props.direction as DrawerDirection
  if (direction === 'rtl' || direction === 'ltr') {
    style.width = props.size
    style.height = '100%'
  } else {
    style.height = props.size
    style.width = '100%'
  }

  return style
})

// Scroll lock
const scrollLockActive = computed(() => isOpen.value)
useScrollLock({ active: scrollLockActive })

function open() {
  isMounted.value = true

  nextTick(() => {
    isOpen.value = true
    emit('open')
  })
}

function close() {
  if (!isOpen.value) return
  isOpen.value = false
  emit('close')
  emit('update:modelValue', false)
}

function handleClose() {
  close()
}

function handleOverlayClick(event: MouseEvent) {
  if (event.target === overlayRef.value && props.closeOnClickModal) {
    close()
  }
}

function handleAfterLeave() {
  if (props.destroyOnClose) {
    isMounted.value = false
  }
  emit('closed')
}

function handleAfterEnter() {
  emit('opened')
}

watch(() => props.modelValue, (val) => {
  if (val) {
    open()
  } else if (isOpen.value) {
    close()
  }
}, { immediate: true })
</script>
