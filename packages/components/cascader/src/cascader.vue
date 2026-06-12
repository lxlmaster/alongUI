<template>
  <div
    class="al-cascader"
    :class="{ 'is-disabled': disabled, 'is-expanded': expanded }"
    ref="triggerRef"
    v-click-outside="handleClickOutside"
  >
    <div
      class="al-cascader__trigger"
      role="combobox"
      :tabindex="disabled ? -1 : 0"
      :aria-expanded="expanded"
      @click="handleTriggerClick"
      @keydown.enter="handleTriggerClick"
    >
      <span v-if="displayText" class="al-cascader__label">{{ displayText }}</span>
      <span v-else class="al-cascader__placeholder">{{ placeholder }}</span>
      <span class="al-cascader__arrow" :class="{ 'is-expanded': expanded }">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 5L6 8L9 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>

    <transition name="al-cascader-fade">
      <div v-if="expanded" class="al-cascader__dropdown">
        <div class="al-cascader__menus">
          <div
            v-for="(menu, menuIdx) in menus"
            :key="menuIdx"
            class="al-cascader__menu"
          >
            <div
              v-for="option in menu"
              :key="option.value"
              class="al-cascader__option"
              :class="{
                'is-active': isActiveOption(menuIdx, option),
                'is-disabled': option.disabled
              }"
              @click="handleOptionClick(menuIdx, option)"
              role="option"
              :aria-selected="isActiveOption(menuIdx, option)"
            >
              <span class="al-cascader__option-label">{{ option.label }}</span>
              <span v-if="option.children?.length" class="al-cascader__option-suffix">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M5 3L8 6L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cascaderEmits, cascaderProps } from './cascader'
import type { CascaderOption } from './cascader'

type ClickOutsideElement = HTMLElement & {
  __clickOutside?: (event: MouseEvent) => void
}

defineOptions({
  name: 'AlCascader'
})

const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)

const expanded = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const selectedPath = ref<CascaderOption[]>([])
const hoveredMenus = ref<number[]>([])

const displayText = computed(() => {
  return selectedPath.value.map(o => o.label).join(' / ')
})

const menus = computed(() => {
  const result: CascaderOption[][] = []
  let current: CascaderOption[] = props.options

  result.push(current)

  for (let i = 0; i < selectedPath.value.length; i++) {
    const selected = selectedPath.value[i]
    const found = current.find(o => o.value === selected.value)
    if (found?.children?.length) {
      result.push(found.children)
      current = found.children
    } else {
      break
    }
  }

  return result
})

function isActiveOption(menuIdx: number, option: CascaderOption) {
  return selectedPath.value[menuIdx]?.value === option.value
}

function handleTriggerClick() {
  if (props.disabled) return
  expanded.value = !expanded.value
}

function handleOptionClick(menuIdx: number, option: CascaderOption) {
  if (option.disabled) return

  // Cut off deeper selections
  selectedPath.value = selectedPath.value.slice(0, menuIdx)
  selectedPath.value.push(option)

  if (!option.children?.length) {
    // Leaf node - confirm selection
    const val = option.value
    emit('update:modelValue', val)
    emit('change', val)
    expanded.value = false
  }
}

function handleClickOutside() {
  expanded.value = false
}

watch(() => props.modelValue, (val) => {
  if (!val) {
    selectedPath.value = []
    return
  }
  // Find path by value
  function findPath(options: CascaderOption[], target: string | number, path: CascaderOption[]): CascaderOption[] | null {
    for (const opt of options) {
      if (opt.value === target) {
        return [...path, opt]
      }
      if (opt.children) {
        const result = findPath(opt.children, target, [...path, opt])
        if (result) return result
      }
    }
    return null
  }
  const path = findPath(props.options, val, [])
  if (path) {
    selectedPath.value = path
  }
}, { immediate: true })

// v-click-outside directive
const vClickOutside = {
  mounted(el: ClickOutsideElement, binding: { value: () => void }) {
    el.__clickOutside = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value()
      }
    }
    document.addEventListener('click', el.__clickOutside)
  },
  unmounted(el: ClickOutsideElement) {
    if (el.__clickOutside) {
      document.removeEventListener('click', el.__clickOutside)
    }
  }
}
</script>
