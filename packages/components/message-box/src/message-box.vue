<template>
  <Teleport to="body">
    <transition name="al-message-box-fade" @after-leave="handleAfterLeave">
      <div
        v-if="visible"
        class="al-message-box-overlay"
        @click="handleOverlayClick"
      >
        <div
          ref="dialogRef"
          class="al-message-box"
          :class="{ 'al-message-box--prompt': showInput }"
          role="alertdialog"
          aria-modal="true"
          :aria-label="title"
          tabindex="-1"
          @click.stop
          @keydown.escape="handleCancel"
        >
          <div class="al-message-box__header">
            <span v-if="type === 'warning'" class="al-message-box__status al-message-box__status--warning">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <span class="al-message-box__title">{{ title }}</span>
          </div>

          <div class="al-message-box__body">
            <div class="al-message-box__message">{{ content }}</div>

            <div v-if="showInput" class="al-message-box__input-wrapper">
              <input
                ref="inputRef"
                v-model="inputValue"
                class="al-message-box__input"
                :placeholder="inputPlaceholder"
                type="text"
                @keydown.enter="handleConfirm"
              />
            </div>
          </div>

          <div class="al-message-box__footer">
            <button
              v-if="cancelButtonText"
              class="al-message-box__btn al-message-box__btn--cancel"
              @click="handleCancel"
            >
              {{ cancelButtonText }}
            </button>
            <button
              class="al-message-box__btn al-message-box__btn--confirm"
              :class="{ 'is-disabled': confirmButtonLoading }"
              :disabled="confirmButtonDisabled"
              @click="handleConfirm"
            >
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useScrollLock, useFocusTrap } from '@along-ui/hooks'

defineOptions({
  name: 'AlMessageBox'
})

const props = withDefaults(defineProps<{
  visible?: boolean
  title?: string
  content?: string
  type?: '' | 'success' | 'warning' | 'info' | 'error'
  showInput?: boolean
  inputPlaceholder?: string
  inputValue?: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonLoading?: boolean
  confirmButtonDisabled?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
}>(), {
  visible: false,
  title: '',
  content: '',
  type: '',
  showInput: false,
  inputPlaceholder: 'Please input',
  inputValue: '',
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  closeOnClickModal: true,
  closeOnPressEscape: true
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  confirm: [value?: string]
  cancel: []
}>()

const dialogRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const visible = ref(false)
const inputValue = ref(props.inputValue || '')
const zIndex = ref(getNextZIndex())

// Use visible ref directly (useScrollLock accepts Ref<boolean>)
useScrollLock({ active: visible })

useFocusTrap(dialogRef, {
  active: visible,
  initialFocus: 'auto',
  restoreFocus: true
})

function open() {
  visible.value = true
  zIndex.value = getNextZIndex()
  inputValue.value = props.inputValue || ''

  nextTick(() => {
    if (props.showInput && inputRef.value) {
      inputRef.value.focus()
    }
  })
}

function close() {
  visible.value = false
  emit('update:visible', false)
}

function handleConfirm() {
  if (props.confirmButtonDisabled) return
  if (props.showInput) {
    emit('confirm', inputValue.value)
  } else {
    emit('confirm')
  }
  close()
}

function handleCancel() {
  emit('cancel')
  close()
}

function handleOverlayClick() {
  if (props.closeOnClickModal) {
    handleCancel()
  }
}

function handleAfterLeave() {
  // cleanup placeholder
}

watch(() => props.visible, (val) => {
  if (val) {
    open()
  } else if (!val && visible.value) {
    close()
  }
}, { immediate: true })
</script>

<script lang="ts">
let zIndexCounter = 3000

function getNextZIndex(): string {
  return String(++zIndexCounter)
}
</script>
