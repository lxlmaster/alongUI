<template>
  <template v-if="divided">
    <div class="al-dropdown-item__divider" role="separator" />
  </template>
  <button
    class="al-dropdown-item"
    :class="{ 'is-disabled': disabled }"
    :disabled="disabled"
    role="menuitem"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { dropdownItemProps } from './dropdown-item'

defineOptions({
  name: 'AlDropdownItem'
})

const props = defineProps(dropdownItemProps)
const emit = defineEmits<{
  command: [value: string | number | undefined]
}>()

function handleClick() {
  if (props.disabled) return
  emit('command', props.command)
}
</script>
