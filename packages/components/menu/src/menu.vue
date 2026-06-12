<template>
  <ul
    class="al-menu"
    :class="[
      `al-menu--${mode}`,
      { 'is-collapse': collapse }
    ]"
    role="menubar"
    :aria-orientation="mode"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, watch } from 'vue'
import { menuContextKey, menuEmits, menuProps } from './menu'
import type { MenuContext } from './menu'

defineOptions({
  name: 'AlMenu'
})

const props = defineProps(menuProps)
const emit = defineEmits(menuEmits)

const activeIndex = ref(props.defaultActive)
const subMenuMap = reactive(new Map<string, (active: boolean) => void>())

watch(() => props.defaultActive, (val) => {
  activeIndex.value = val
})

function handleMenuItemClick(index: string) {
  activeIndex.value = index
  emit('select', index, [index])
}

function handleSubMenuClick(index: string) {
  const updater = subMenuMap.get(index)
  if (updater) {
    updater(true)
  }
}

function addSubMenu(index: string, updateActive: (active: boolean) => void) {
  subMenuMap.set(index, updateActive)
}

function removeSubMenu(index: string) {
  subMenuMap.delete(index)
}

const menuContext: MenuContext = {
  activeIndex: computed(() => activeIndex.value),
  mode: props.mode,
  collapse: props.collapse,
  router: props.router,
  handleMenuItemClick,
  handleSubMenuClick,
  addSubMenu,
  removeSubMenu
}

provide(menuContextKey, menuContext)
</script>
