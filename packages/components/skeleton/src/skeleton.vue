<template>
  <div v-if="loading" class="al-skeleton" :class="{ 'is-animated': animated }">
    <div class="al-skeleton__pulse" />
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { skeletonProps } from './skeleton'

defineOptions({
  name: 'AlSkeleton'
})

defineProps(skeletonProps)
</script>
