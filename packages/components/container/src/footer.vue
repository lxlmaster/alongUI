<template>
  <footer class="al-footer" :style="{ height }">
    <slot />
  </footer>
</template>

<script setup lang="ts">
import { footerProps } from './footer'

defineOptions({
  name: 'AlFooter'
})

defineProps(footerProps)
</script>
