<template>
  <div
    v-if="loading"
    class="al-skeleton"
    :class="[
      `al-skeleton--${variant}`,
      { 'is-animated': animated }
    ]"
    :style="wrapperStyle"
  >
    <!-- Text line -->
    <template v-if="variant === 'text'">
      <div class="al-skeleton__text" :style="itemStyle" />
    </template>

    <!-- Title -->
    <template v-else-if="variant === 'title'">
      <div class="al-skeleton__title" :style="itemStyle" />
    </template>

    <!-- Paragraph -->
    <template v-else-if="variant === 'paragraph'">
      <div
        v-for="i in rows"
        :key="i"
        class="al-skeleton__paragraph"
        :style="paragraphRowStyle(i)"
      />
    </template>

    <!-- Avatar -->
    <template v-else-if="variant === 'avatar'">
      <div
        class="al-skeleton__avatar"
        :class="`al-skeleton__avatar--${shape}`"
        :style="avatarStyle"
      />
    </template>

    <!-- Image -->
    <template v-else-if="variant === 'image'">
      <div class="al-skeleton__image" :style="imageStyle" />
    </template>

    <!-- Card -->
    <template v-else-if="variant === 'card'">
      <div class="al-skeleton__card">
        <div class="al-skeleton__card-image" />
        <div class="al-skeleton__card-body">
          <div class="al-skeleton__title" />
          <div
            v-for="i in 2"
            :key="i"
            class="al-skeleton__paragraph"
            :style="{ width: i === 1 ? '85%' : '60%' }"
          />
        </div>
      </div>
    </template>

    <!-- Table row -->
    <template v-else-if="variant === 'table-row'">
      <div class="al-skeleton__table-row">
        <div
          v-for="i in rows"
          :key="i"
          class="al-skeleton__table-cell"
          :style="tableCellStyle(i)"
        />
      </div>
    </template>

    <!-- Button -->
    <template v-else-if="variant === 'button'">
      <div class="al-skeleton__button" :style="buttonStyle" />
    </template>

    <!-- Input -->
    <template v-else-if="variant === 'input'">
      <div class="al-skeleton__input" />
    </template>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { skeletonProps } from './skeleton'

defineOptions({
  name: 'AlSkeleton'
})

const props = defineProps(skeletonProps)

const toPx = (v: string | number | undefined, fallback?: string): string | undefined => {
  if (v === undefined) return fallback
  return typeof v === 'number' ? `${v}px` : v
}

const wrapperStyle = computed(() => {
  const style: Record<string, string> = {}
  const w = toPx(props.width)
  if (w) style.width = w
  return style
})

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  const w = toPx(props.width)
  if (w) style.width = w
  const h = toPx(props.height)
  if (h) style.height = h
  return style
})

const avatarStyle = computed(() => {
  const size = toPx(props.avatarSize)
  return {
    width: size ?? '40px',
    height: size ?? '40px'
  }
})

const imageStyle = computed(() => {
  const style: Record<string, string> = {}
  const w = toPx(props.width, '100%')
  style.width = w!
  const h = toPx(props.height, '200px')
  style.height = h!
  return style
})

const buttonStyle = computed(() => {
  const style: Record<string, string> = {}
  const w = toPx(props.width, '100px')
  style.width = w!
  const h = toPx(props.height, '36px')
  style.height = h!
  return style
})

function paragraphRowStyle(index: number) {
  const widths = ['100%', '92%', '80%', '88%', '70%']
  return { width: widths[(index - 1) % widths.length] }
}

function tableCellStyle(index: number) {
  const widths = ['30%', '20%', '25%', '15%', '10%']
  return { width: widths[(index - 1) % widths.length] }
}
</script>
