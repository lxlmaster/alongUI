<template>
  <span class="al-icon" :style="iconStyle" aria-hidden="true">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '@along-ui/utils'
import { iconProps } from './icon'

defineOptions({
  name: 'AlIcon'
})

const props = defineProps(iconProps)

const iconStyle = computed(() => ({
  fontSize: addUnit(props.size),
  color: props.color
}))
</script>

