<template>
  <Teleport to="body">
    <transition name="al-notification-slide" @after-leave="handleAfterLeave">
      <div
        v-if="visible"
        class="al-notification"
        :class="`al-notification--${type}`"
        role="alert"
        @mouseenter="clearTimer"
        @mouseleave="startTimer"
      >
        <div class="al-notification__icon">
          <!-- Success -->
          <svg v-if="type === 'success'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <!-- Warning -->
          <svg v-else-if="type === 'warning'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <!-- Info -->
          <svg v-else-if="type === 'info'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <!-- Error -->
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <div class="al-notification__body">
          <div v-if="title" class="al-notification__title">{{ title }}</div>
          <div class="al-notification__message">
            <slot>{{ message }}</slot>
          </div>
        </div>

        <button
          v-if="showClose"
          class="al-notification__close"
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
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { NotificationType } from './notification'

defineOptions({
  name: 'AlNotification'
})

const props = withDefaults(defineProps<{
  title?: string
  message?: string
  type?: NotificationType
  duration?: number
  showClose?: boolean
  onClose?: () => void
}>(), {
  title: '',
  message: '',
  type: 'info',
  duration: 4500,
  showClose: true
})

const emit = defineEmits<{
  destroy: []
}>()

const visible = ref(false)
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
