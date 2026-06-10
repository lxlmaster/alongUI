<template>
  <transition name="al-message-fade" @after-leave="handleAfterLeave">
    <div
      v-if="visible"
      ref="messageRef"
      class="al-message"
      :class="[`al-message--${type}`, { 'is-closable': showClose }]"
      role="alert"
    >
      <span class="al-message__icon">
        <!-- Success -->
        <svg v-if="type === 'success'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <!-- Warning -->
        <svg v-else-if="type === 'warning'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <!-- Info -->
        <svg v-else-if="type === 'info'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <!-- Error -->
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </span>
      <span class="al-message__content">
        <slot>{{ message }}</slot>
      </span>
      <button
        v-if="showClose"
        class="al-message__close"
        aria-label="Close"
        @click="handleClose"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { MessageType } from './message'

defineOptions({
  name: 'AlMessage'
})

const props = withDefaults(defineProps<{
  message?: string
  type?: MessageType
  duration?: number
  showClose?: boolean
  onClose?: () => void
}>(), {
  message: '',
  type: 'info',
  duration: 3000,
  showClose: false
})

const emit = defineEmits<{
  destroy: []
}>()

const visible = ref(false)
const messageRef = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null

function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function close() {
  visible.value = false
}

function handleClose() {
  close()
}

function handleAfterLeave() {
  props.onClose?.()
  emit('destroy')
}

onMounted(() => {
  visible.value = true
  startTimer()
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>
