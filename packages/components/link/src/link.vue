<template>
  <a
    class="al-link"
    :class="[
      `al-link--${type}`,
      {
        'is-underline': underline,
        'is-disabled': disabled
      }
    ]"
    :href="disabled ? undefined : href"
    :target="disabled ? undefined : target"
    @click="handleClick"
  >
    <span v-if="icon || $slots.icon" class="al-link__icon">
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>
    <span class="al-link__content">
      <slot />
    </span>
  </a>
</template>

<script setup lang="ts">
import { linkProps, linkEmits } from './link'

defineOptions({
  name: 'AlLink'
})

const props = defineProps(linkProps)
const emit = defineEmits(linkEmits)

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>
