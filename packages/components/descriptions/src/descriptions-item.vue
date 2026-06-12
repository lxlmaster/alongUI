<template>
  <slot />
</template>

<script setup lang="ts">
import { descriptionsItemProps } from './descriptions-item'

defineOptions({
  name: 'AlDescriptionsItem'
})

defineProps(descriptionsItemProps)
</script>
