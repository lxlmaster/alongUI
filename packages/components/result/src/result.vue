<template>
  <div class="al-result" :class="`al-result--${status}`">
    <div class="al-result__icon-wrap">
      <slot name="icon">
        <span class="al-result__icon" v-html="iconSvg" />
      </slot>
    </div>
    <div v-if="title" class="al-result__title">{{ title }}</div>
    <div v-if="subTitle" class="al-result__subtitle">{{ subTitle }}</div>
    <div v-if="$slots.default || $slots.extra" class="al-result__extra">
      <slot name="extra">
        <slot />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resultProps } from './result'

defineOptions({
  name: 'AlResult'
})

const props = defineProps(resultProps)

const icons: Record<string, string> = {
  success: '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="#30d158" opacity="0.15"/><circle cx="32" cy="32" r="24" fill="#30d158"/><path d="M24 33l6 6 10-12" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  error: '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="#ff453a" opacity="0.15"/><circle cx="32" cy="32" r="24" fill="#ff453a"/><path d="M26 26l12 12M38 26l-12 12" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>',
  warning: '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="#ff9f0a" opacity="0.12"/><path d="M32 16L14 48h36L32 16z" fill="#ff9f0a"/><path d="M32 32v8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="46" r="2" fill="#fff"/></svg>',
  info: '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="#007aff" opacity="0.12"/><circle cx="32" cy="32" r="24" fill="#007aff"/><path d="M32 28v12" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="22" r="2" fill="#fff"/></svg>',
  '403': '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="#ff9f0a" opacity="0.12"/><path d="M22 26h20v20H22V26z" stroke="#ff9f0a" stroke-width="2.5" fill="none"/><path d="M28 26v-4a4 4 0 018 0v4" stroke="#ff9f0a" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="32" cy="36" r="2.5" fill="#ff9f0a"/></svg>',
  '404': '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="#86868b" opacity="0.1"/><text x="32" y="32" text-anchor="middle" dominant-baseline="central" font-size="28" font-weight="700" fill="#86868b">404</text><circle cx="32" cy="44" r="2" fill="#86868b"/></svg>',
  '500': '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="#ff453a" opacity="0.1"/><text x="32" y="30" text-anchor="middle" dominant-baseline="central" font-size="28" font-weight="700" fill="#ff453a">500</text><path d="M22 38l20-12" stroke="#ff453a" stroke-width="2.5" stroke-linecap="round"/></svg>'
}

const iconSvg = computed(() => icons[props.status] || icons.info)
</script>
