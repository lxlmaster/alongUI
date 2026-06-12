<template>
  <div class="al-empty">
    <div class="al-empty__image">
      <slot name="image">
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          <rect x="12" y="20" width="96" height="64" rx="8" fill="var(--al-bg-color-input)" stroke="var(--al-border-color)" stroke-width="1.5" />
          <circle cx="60" cy="48" r="12" fill="var(--al-border-color)" opacity="0.5" />
          <path d="M45 70c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="var(--al-border-color)" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
          <path d="M30 28h60M30 36h40" stroke="var(--al-border-color)" stroke-width="1.5" stroke-linecap="round" opacity="0.3" />
        </svg>
      </slot>
    </div>
    <p v-if="description" class="al-empty__description">
      {{ description }}
    </p>
    <div v-if="$slots.action" class="al-empty__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { emptyProps } from './empty'

defineOptions({
  name: 'AlEmpty'
})

defineProps(emptyProps)
</script>
