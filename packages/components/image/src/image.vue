<template>
  <div class="al-image" :class="{ 'al-image--preview': hasPreview }">
    <img
      v-show="!error && !loading"
      ref="imgRef"
      class="al-image__img"
      :src="src"
      :alt="alt"
      :style="{ objectFit: fit }"
      @load="handleLoad"
      @error="handleError"
      @click="handlePreview"
    />
    <div v-if="loading" class="al-image__placeholder">
      <slot name="placeholder">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.3"/>
        </svg>
      </slot>
    </div>
    <div v-if="error" class="al-image__error">
      <slot name="error">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.3"/>
          <path d="M8 8L16 16M16 8L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
        </svg>
      </slot>
    </div>

    <!-- Preview overlay -->
    <Teleport to="body">
      <transition name="al-image-fade">
        <div
          v-if="previewVisible"
          class="al-image__preview-mask"
          @click.self="closePreview"
        >
          <button class="al-image__preview-close" @click="closePreview" aria-label="Close preview">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <img
            class="al-image__preview-img"
            :src="previewSrcList[previewIndex]"
            alt="preview"
          />
          <div v-if="previewSrcList.length > 1" class="al-image__preview-nav">
            <button class="al-image__preview-btn" @click="prevPreview" aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <span class="al-image__preview-count">{{ previewIndex + 1 }} / {{ previewSrcList.length }}</span>
            <button class="al-image__preview-btn" @click="nextPreview" aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { imageProps } from './image'

defineOptions({
  name: 'AlImage'
})

const props = defineProps(imageProps)

const loading = ref(true)
const error = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)
const previewVisible = ref(false)
const previewIndex = ref(0)

const hasPreview = computed(() => props.previewSrcList.length > 0)

function handleLoad() {
  loading.value = false
  error.value = false
}

function handleError() {
  loading.value = false
  error.value = true
}

function handlePreview() {
  if (!hasPreview.value) return
  previewIndex.value = props.previewSrcList.indexOf(props.src)
  if (previewIndex.value === -1) previewIndex.value = 0
  previewVisible.value = true
}

function closePreview() {
  previewVisible.value = false
}

function prevPreview() {
  if (previewIndex.value > 0) {
    previewIndex.value--
  } else {
    previewIndex.value = props.previewSrcList.length - 1
  }
}

function nextPreview() {
  if (previewIndex.value < props.previewSrcList.length - 1) {
    previewIndex.value++
  } else {
    previewIndex.value = 0
  }
}
</script>
