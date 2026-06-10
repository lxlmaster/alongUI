<template>
  <aside class="al-aside" :style="{ width }">
    <slot />
  </aside>
</template>

<script setup lang="ts">
import { asideProps } from './aside'

defineOptions({
  name: 'AlAside'
})

defineProps(asideProps)
</script>
