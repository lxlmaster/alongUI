<template>
  <div
    class="al-input"
    :class="[
      `al-input--${type}`,
      {
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-focused': focused
      }
    ]"
  >
    <template v-if="type === 'textarea'">
      <textarea
        ref="textareaRef"
        class="al-input__inner al-input__textarea"
        :value="nativeValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxlength"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
    <template v-else>
      <span v-if="$slots.prefix" class="al-input__prefix">
        <slot name="prefix" />
      </span>
      <input
        ref="inputRef"
        class="al-input__inner"
        :type="type"
        :value="nativeValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <button
        v-if="showClear"
        class="al-input__clear"
        type="button"
        aria-label="清空"
        @click="handleClear"
      >
        ×
      </button>
      <span v-if="$slots.suffix" class="al-input__suffix">
        <slot name="suffix" />
      </span>
    </template>
    <span v-if="showWordLimit && maxlength" class="al-input__count">
      {{ nativeValue.length }} / {{ maxlength }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { inputEmits, inputProps } from './input'

defineOptions({
  name: 'AlInput'
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const inputRef = ref<HTMLInputElement>()
const textareaRef = ref<HTMLTextAreaElement>()
const focused = ref(false)

const nativeValue = computed(() => String(props.modelValue ?? ''))
const showClear = computed(() => props.clearable && !props.disabled && !props.readonly && nativeValue.value)

function emitValue(value: string) {
  emit('update:modelValue', value)
  emit('input', value)
}

function handleInput(event: Event) {
  emitValue((event.target as HTMLInputElement | HTMLTextAreaElement).value)
}

function handleChange(event: Event) {
  emit('change', (event.target as HTMLInputElement | HTMLTextAreaElement).value)
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
}

function handleClear() {
  emitValue('')
  emit('change', '')
  emit('clear')
}

defineExpose({
  inputRef,
  textareaRef
})
</script>

