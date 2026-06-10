<template>
  <li
    class="al-menu-item"
    :class="{ 'is-active': isActive, 'is-disabled': disabled }"
    role="menuitem"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
    @keydown.enter="handleClick"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { menuContextKey } from './menu'

defineOptions({ name: 'AlMenuItem' })

const props = defineProps<{ index: string; disabled?: boolean }>()
const menuContext = inject(menuContextKey)!

const isActive = computed(() => menuContext.activeIndex.value === props.index)

function handleClick() {
  if (props.disabled) return
  menuContext.handleMenuItemClick(props.index)
}
</script>
