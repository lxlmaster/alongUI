<template>
  <header class="al-header" :style="{ height }">
    <slot />
  </header>
</template>

<script setup lang="ts">
import { headerProps } from './header'

defineOptions({
  name: 'AlHeader'
})

defineProps(headerProps)
</script>
