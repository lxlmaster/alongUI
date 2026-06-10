<template>
  <div
    class="al-rate"
    :class="{
      'is-disabled': disabled
    }"
    role="slider"
    :aria-valuenow="modelValue"
    :aria-valuemin="0"
    :aria-valuemax="count"
    :aria-disabled="disabled"
  >
    <span
      v-for="i in count"
      :key="i"
      class="al-rate__item"
      :style="{ fontSize: `${size}px`, width: `${size}px`, height: `${size}px` }"
      @mousemove="handleItemHover(i, $event)"
      @mouseleave="handleItemLeave"
      @click="handleItemClick(i, $event)"
    >
      <span
        class="al-rate__star"
        :class="{ 'is-half': allowHalf && isHalf(i), 'is-full': isFull(i) }"
      >
        <span
          class="al-rate__star-first"
          :style="{ color: isHalf(i) ? color : voidColor }"
        >
          ★
        </span>
        <span
          class="al-rate__star-second"
          :style="{ color: isFull(i) ? color : voidColor }"
        >
          ★
        </span>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { rateEmits, rateProps } from './rate'

defineOptions({
  name: 'AlRate'
})

const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)

const hoverIndex = ref(0)

function isFull(i: number): boolean {
  return props.modelValue >= i
}

function isHalf(i: number): boolean {
  if (!props.allowHalf) return false
  const diff = props.modelValue - (i - 1)
  return diff > 0 && diff < 1
}

function handleItemHover(i: number, event: MouseEvent) {
  if (props.disabled) return
  if (props.allowHalf) {
    const el = event.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left
    hoverIndex.value = x < rect.width / 2 ? i - 0.5 : i
  } else {
    hoverIndex.value = i
  }
}

function handleItemLeave() {
  hoverIndex.value = 0
}

function handleItemClick(i: number, event: MouseEvent) {
  if (props.disabled) return
  let value: number
  if (props.allowHalf) {
    const el = event.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left
    value = x < rect.width / 2 ? i - 0.5 : i
  } else {
    value = i
  }

  if (value === props.modelValue) {
    value = 0
  }

  emit('update:modelValue', value)
  emit('change', value)
}
</script>
