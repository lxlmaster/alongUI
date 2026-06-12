<template>
  <nav class="al-breadcrumb" aria-label="Breadcrumb">
    <ol class="al-breadcrumb__list">
      <slot />
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { breadcrumbContextKey, breadcrumbProps } from './breadcrumb'
import type { BreadcrumbContext } from './breadcrumb'

defineOptions({
  name: 'AlBreadcrumb'
})

const props = defineProps(breadcrumbProps)

const breadcrumbContext: BreadcrumbContext = {
  separator: props.separator
}

provide(breadcrumbContextKey, breadcrumbContext)
</script>
