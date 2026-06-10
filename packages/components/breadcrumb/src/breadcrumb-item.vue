<template>
  <li class="al-breadcrumb__item">
    <span
      class="al-breadcrumb__inner"
      :class="{ 'is-link': !!to }"
      :tabindex="to ? 0 : undefined"
      role="link"
      @click="handleClick"
      @keydown.enter="handleClick"
    >
      <slot />
    </span>
    <span class="al-breadcrumb__separator" aria-hidden="true">{{ separator }}</span>
  </li>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { breadcrumbContextKey } from './breadcrumb'
import type { BreadcrumbContext } from './breadcrumb'
import { breadcrumbItemProps } from './breadcrumb-item'

defineOptions({
  name: 'AlBreadcrumbItem'
})

const props = defineProps(breadcrumbItemProps)

const breadcrumbContext = inject<BreadcrumbContext>(breadcrumbContextKey)!
const separator = breadcrumbContext.separator

function handleClick() {
  if (!props.to) return
  const url = typeof props.to === 'string' ? props.to : (props.to as any).path || '#'
  window.location.href = url
}
</script>
