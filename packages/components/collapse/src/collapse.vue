<template>
  <div class="al-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, watch } from 'vue'
import { collapseContextKey, collapseEmits, collapseProps } from './collapse'
import type { CollapseContext } from './collapse'

defineOptions({
  name: 'AlCollapse'
})

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const activeNames = computed(() => props.modelValue)

function handleItemClick(name: string | number) {
  if (props.accordion) {
    const newVal = activeNames.value === name ? '' : name
    emit('update:modelValue', newVal)
    emit('change', newVal)
  } else {
    const current = Array.isArray(activeNames.value) ? activeNames.value : []
    const idx = current.indexOf(name)
    let newVal: (string | number)[]
    if (idx > -1) {
      newVal = [...current.slice(0, idx), ...current.slice(idx + 1)]
    } else {
      newVal = [...current, name]
    }
    emit('update:modelValue', newVal)
    emit('change', newVal)
  }
}

const collapseContext: CollapseContext = {
  activeNames: activeNames.value,
  accordion: props.accordion,
  handleItemClick
}

provide(collapseContextKey, collapseContext)
</script>
