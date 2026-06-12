<template>
  <Teleport to="body">
    <transition name="al-dialog-fade" @after-leave="onAfterLeave" @after-enter="onAfterEnter">
      <div
        v-if="shouldRender"
        v-show="isOpen"
        ref="overlayRef"
        class="al-dialog-overlay"
        :style="{ zIndex }"
        @mousedown="handleOverlayClick"
      >
        <div
          ref="dialogRef"
          class="al-dialog"
          :class="{
            'al-dialog--fullscreen': fullscreen,
            'is-draggable': draggable
          }"
          :style="dialogStyle"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          tabindex="-1"
          @keydown="handleKeydown"
          @click.stop
        >
          <!-- Header -->
          <div
            class="al-dialog__header"
            @mousedown.prevent="handleHeaderMousedown"
          >
            <slot name="header">
              <span class="al-dialog__title">{{ title }}</span>
            </slot>
            <button
              v-if="showClose"
              class="al-dialog__close"
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
          <div class="al-dialog__body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="al-dialog__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useScrollLock, useFocusTrap } from '@along-ui/hooks'

defineOptions({
  name: 'AlDialog'
})

const props = withDefaults(defineProps<{
  modelValue?: boolean
  title?: string
  width?: string | number
  fullscreen?: boolean
  top?: string
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  draggable?: boolean
  destroyOnClose?: boolean
}>(), {
  modelValue: false,
  title: '',
  width: '520px',
  fullscreen: false,
  top: '15vh',
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  draggable: false,
  destroyOnClose: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  opened: []
  closed: []
}>()

const dialogRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const isMounted = ref(false)
const zIndex = ref(getNextZIndex())

// Drag state
const offsetX = ref(0)
const offsetY = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)

const shouldRender = computed(() => {
  if (props.destroyOnClose) return isMounted.value
  return isMounted.value || isOpen.value
})

const dialogStyle = computed(() => {
  const style: Record<string, string> = {}

  if (!props.fullscreen) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    style.marginTop = props.top
  }

  if (props.draggable && (offsetX.value !== 0 || offsetY.value !== 0)) {
    style.transform = `translate(${offsetX.value}px, ${offsetY.value}px)`
  }

  return style
})

// Scroll lock
const scrollLockActive = computed(() => isOpen.value)
useScrollLock({ active: scrollLockActive })

// Focus trap
useFocusTrap(dialogRef, {
  active: isOpen,
  initialFocus: 'auto',
  restoreFocus: true
})

function open() {
  isMounted.value = true
  zIndex.value = getNextZIndex()

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
  // Only close when clicking the overlay itself, not its children
  if (event.target === overlayRef.value && props.closeOnClickModal) {
    close()
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnPressEscape) {
    close()
  }
}

function handleHeaderMousedown(event: MouseEvent) {
  if (!props.draggable) return

  isDragging.value = true
  startX.value = event.clientX
  startY.value = event.clientY

  function onMousemove(e: MouseEvent) {
    if (!isDragging.value) return
    offsetX.value += e.clientX - startX.value
    offsetY.value += e.clientY - startY.value
    startX.value = e.clientX
    startY.value = e.clientY
  }

  function onMouseup() {
    isDragging.value = false
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }

  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

function onAfterLeave() {
  if (props.destroyOnClose) {
    isMounted.value = false
  }
  emit('closed')
}

function onAfterEnter() {
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

<script lang="ts">
let zIndexCounter = 2000

function getNextZIndex(): string {
  return String(++zIndexCounter)
}
</script>
