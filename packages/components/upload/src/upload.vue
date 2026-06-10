<template>
  <div class="al-upload" :class="{ 'is-disabled': disabled }">
    <!-- Drag zone -->
    <div
      v-if="drag"
      class="al-upload__drag"
      :class="{ 'al-upload__drag--hover': isDragOver }"
      @click="handleClick"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <div class="al-upload__drag-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <p class="al-upload__drag-text">
        <slot name="tip">拖拽文件到此区域，或点击上传</slot>
      </p>
    </div>

    <!-- Default trigger slot -->
    <div v-else class="al-upload__trigger" @click="handleClick">
      <slot />
    </div>

    <!-- Tip slot for non-drag mode -->
    <div v-if="$slots.tip && !drag" class="al-upload__tip">
      <slot name="tip" />
    </div>

    <!-- Hidden file input -->
    <input
      ref="inputRef"
      type="file"
      class="al-upload__input"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="handleChange"
    />

    <!-- File list -->
    <ul v-if="fileList.length > 0" class="al-upload__list">
      <li
        v-for="file in fileList"
        :key="file.uid"
        class="al-upload__file"
        :class="`al-upload__file--${file.status}`"
      >
        <span class="al-upload__file-name">{{ file.name }}</span>
        <span class="al-upload__file-size">{{ formatSize(file.size) }}</span>

        <!-- Progress bar -->
        <div v-if="file.status === 'uploading'" class="al-upload__progress">
          <div class="al-upload__progress-bar" :style="{ width: file.percentage + '%' }" />
        </div>

        <!-- Status icon -->
        <span v-if="file.status === 'success'" class="al-upload__file-status al-upload__file-status--success">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span v-else-if="file.status === 'fail'" class="al-upload__file-status al-upload__file-status--fail">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>

        <!-- Remove button -->
        <button
          class="al-upload__file-remove"
          @click="handleRemove(file)"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile as UploadFileType, UploadProps } from './upload'
import { uploadProps } from './upload'

defineOptions({
  name: 'AlUpload'
})

const props = defineProps(uploadProps)

const emit = defineEmits<{
  'onSuccess': [response: any, file: UploadFileType]
  'onError': [error: Error, file: UploadFileType]
  'onChange': [file: UploadFileType]
  'onRemove': [file: UploadFileType]
  'onExceed': [files: File[]]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const fileList = ref<UploadFileType[]>([])
const isDragOver = ref(false)
let uid = 0

function handleClick() {
  if (props.disabled) return
  inputRef.value?.click()
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  if (!files.length) return

  // Check limit
  if (props.limit && fileList.value.length + files.length > props.limit) {
    emit('onExceed', files)
    // Clear input
    if (inputRef.value) inputRef.value.value = ''
    return
  }

  files.forEach((rawFile) => {
    // Check file size
    if (props.fileSize && rawFile.size > props.fileSize * 1024 * 1024) {
      return
    }

    const uploadFile: UploadFileType = {
      uid: ++uid,
      name: rawFile.name,
      size: rawFile.size,
      percentage: 0,
      status: 'ready',
      raw: rawFile
    }

    fileList.value.push(uploadFile)
    emit('onChange', uploadFile)
    startUpload(uploadFile)
  })

  // Reset input to allow re-selecting same files
  if (inputRef.value) inputRef.value.value = ''
}

function startUpload(file: UploadFileType) {
  if (!props.action) {
    // If no action, mark as success immediately
    file.status = 'success'
    return
  }

  file.status = 'uploading'

  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  // Add custom data fields
  Object.entries(props.data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  formData.append(props.name, file.raw)

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      file.percentage = Math.round((event.loaded / event.total) * 100)
    }
  })

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      file.status = 'success'
      file.percentage = 100
      try {
        file.response = JSON.parse(xhr.responseText)
      } catch {
        file.response = xhr.responseText
      }
      emit('onSuccess', file.response, file)
    } else {
      file.status = 'fail'
      emit('onError', new Error(`Upload failed with status ${xhr.status}`), file)
    }
  })

  xhr.addEventListener('error', () => {
    file.status = 'fail'
    emit('onError', new Error('Network error'), file)
  })

  xhr.open('POST', props.action, true)

  // Custom headers
  Object.entries(props.headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value)
  })

  if (props.withCredentials) {
    xhr.withCredentials = true
  }

  xhr.send(formData)
}

function handleRemove(file: UploadFileType) {
  const index = fileList.value.indexOf(file)
  if (index > -1) {
    fileList.value.splice(index, 1)
    emit('onRemove', file)
  }
}

function handleDragOver() {
  if (!props.disabled) isDragOver.value = true
}

function handleDragLeave() {
  isDragOver.value = false
}

function handleDrop(event: DragEvent) {
  isDragOver.value = false
  if (props.disabled) return

  const files = Array.from(event.dataTransfer?.files || [])
  if (!files.length) return

  if (props.limit && fileList.value.length + files.length > props.limit) {
    emit('onExceed', files)
    return
  }

  files.forEach((rawFile) => {
    if (props.fileSize && rawFile.size > props.fileSize * 1024 * 1024) return

    const uploadFile: UploadFileType = {
      uid: ++uid,
      name: rawFile.name,
      size: rawFile.size,
      percentage: 0,
      status: 'ready',
      raw: rawFile
    }

    fileList.value.push(uploadFile)
    emit('onChange', uploadFile)
    startUpload(uploadFile)
  })
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
</script>
