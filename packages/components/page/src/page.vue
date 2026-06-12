<template>
  <div class="al-page">
    <div v-if="$slots.header" class="al-page__header">
      <slot name="header" />
    </div>
    <div class="al-page__body">
      <slot />
    </div>
    <div v-if="$slots.actions" class="al-page__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AlPage'
})
</script>
