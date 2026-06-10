<template>
  <div
    ref="rootRef"
    class="al-select"
    :class="{
      'is-open': visible,
      'is-disabled': disabled,
      'is-multiple': multiple,
      'is-filterable': filterable
    }"
  >
    <div
      class="al-select__trigger"
      :tabindex="disabled ? -1 : 0"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="visible"
      :aria-disabled="disabled"
      @click="toggleVisible"
      @keydown="handleKeydown"
    >
      <div class="al-select__value">
        <template v-if="multiple">
          <template v-if="selectedOptions.length">
            <span
              v-for="tag in visibleTags"
              :key="String(tag.value)"
              class="al-select__tag"
            >
              {{ tag.label }}
            </span>
            <span v-if="hiddenTagCount > 0" class="al-select__tag al-select__tag--counter">
              +{{ hiddenTagCount }}
            </span>
          </template>
          <span v-else class="al-select__placeholder">{{ placeholder }}</span>
        </template>
        <template v-else-if="filterable && visible">
          <input
            ref="inputRef"
            v-model="keyword"
            class="al-select__input"
            type="text"
            :placeholder="selectedLabel || placeholder"
            @click.stop
          />
        </template>
        <template v-else>
          <span v-if="selectedLabel" class="al-select__single-value">{{ selectedLabel }}</span>
          <span v-else class="al-select__placeholder">{{ placeholder }}</span>
        </template>
      </div>
      <span
        v-if="showClear"
        class="al-select__clear"
        role="button"
        tabindex="-1"
        aria-label="清空"
        @click.stop="clearValue"
      >
        ×
      </span>
      <span v-else class="al-select__arrow" aria-hidden="true"></span>
    </div>

    <div v-if="visible" class="al-select__dropdown">
      <div v-if="loading" class="al-select__empty">加载中</div>
      <template v-else>
        <button
          v-for="option in displayedOptions"
          :key="optionKey(option)"
          class="al-select__option"
          :class="{
            'is-selected': isSelected(option.value),
            'is-disabled': option.disabled
          }"
          type="button"
          :disabled="option.disabled"
          @click="selectOption(option)"
        >
          <span>{{ option.label }}</span>
          <span v-if="multiple && isSelected(option.value)" class="al-select__check">✓</span>
        </button>
        <div v-if="!displayedOptions.length" class="al-select__empty">暂无可选项</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { selectEmits, selectProps, type SelectOption } from './select'

defineOptions({
  name: 'AlSelect'
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const rootRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const visible = ref(false)
const keyword = ref('')

const normalizedOptions = computed<SelectOption[]>(() => props.options)
const modelArray = computed<Array<string | number>>(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) ? props.modelValue : []
  }

  if (props.modelValue === undefined) {
    return []
  }

  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length ? [props.modelValue[0]] : []
  }

  return [props.modelValue]
})

const selectedOptions = computed(() =>
  normalizedOptions.value.filter((option) => modelArray.value.includes(option.value))
)

const createdOption = computed<SelectOption | null>(() => {
  if (!props.allowCreate || !props.filterable) {
    return null
  }

  const trimmed = keyword.value.trim()
  if (!trimmed) {
    return null
  }

  const exists = normalizedOptions.value.some(
    (option) => option.label === trimmed || String(option.value) === trimmed
  )

  return exists ? null : { label: trimmed, value: trimmed }
})

const displayedOptions = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  const filtered =
    props.filterable && query
      ? normalizedOptions.value.filter((option) =>
          option.label.toLowerCase().includes(query)
        )
      : normalizedOptions.value.slice()

  if (createdOption.value) {
    filtered.unshift(createdOption.value)
  }

  return filtered
})

const selectedLabel = computed(() => selectedOptions.value[0]?.label ?? '')
const visibleTags = computed(() => {
  if (!props.multiple) {
    return []
  }

  if (props.collapseTags && selectedOptions.value.length > 1) {
    return selectedOptions.value.slice(0, 1)
  }

  return selectedOptions.value
})

const hiddenTagCount = computed(() => {
  if (!props.multiple || !props.collapseTags || selectedOptions.value.length <= 1) {
    return 0
  }

  return selectedOptions.value.length - 1
})

const showClear = computed(() => {
  if (!props.clearable || props.disabled || props.loading) {
    return false
  }

  return props.multiple
    ? modelArray.value.length > 0
    : props.modelValue !== undefined && props.modelValue !== ''
})

watch(visible, async (nextVisible) => {
  emit('visibleChange', nextVisible)

  if (nextVisible && props.filterable) {
    await nextTick()
    inputRef.value?.focus()
  }

  if (!nextVisible) {
    keyword.value = ''
  }
})

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

function optionKey(option: SelectOption) {
  return `${String(option.value)}-${option.label}`
}

function handleDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    visible.value = false
  }
}

function toggleVisible() {
  if (props.disabled || props.loading) {
    return
  }

  visible.value = !visible.value
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled || props.loading) {
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleVisible()
  }

  if (event.key === 'Escape') {
    visible.value = false
  }
}

function isSelected(value: string | number) {
  return modelArray.value.includes(value)
}

function emitValue(value: string | number | Array<string | number> | undefined) {
  emit('update:modelValue', value)
  emit('change', value)
}

function selectOption(option: SelectOption) {
  if (option.disabled) {
    return
  }

  if (props.multiple) {
    const next = isSelected(option.value)
      ? modelArray.value.filter((item) => item !== option.value)
      : [...modelArray.value, option.value]
    emitValue(next)

    if (props.filterable) {
      keyword.value = ''
    }

    return
  }

  emitValue(option.value)
  visible.value = false
}

function clearValue() {
  emitValue(props.multiple ? [] : undefined)
  keyword.value = ''
}
</script>
