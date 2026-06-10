<template>
  <span
    class="al-tooltip"
    :class="`al-tooltip--${placement}`"
    @mouseenter="handleOpen('hover')"
    @mouseleave="handleClose('hover')"
    @focusin="handleOpen('focus')"
    @focusout="handleClose('focus')"
    @click="handleClick"
  >
    <span class="al-tooltip__trigger" :aria-describedby="visible ? tooltipId : undefined">
      <slot />
    </span>
    <transition name="al-tooltip-fade">
      <span v-if="visible" :id="tooltipId" class="al-tooltip__popper" role="tooltip">
        <slot name="content">{{ content }}</slot>
      </span>
    </transition>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { tooltipProps, type TooltipTrigger } from './tooltip'

defineOptions({
  name: 'AlTooltip'
})

const props = defineProps(tooltipProps)
const visible = ref(false)
const tooltipId = `al-tooltip-${Math.random().toString(36).slice(2, 10)}`

function handleOpen(trigger: TooltipTrigger) {
  if (!props.disabled && props.trigger === trigger) {
    visible.value = true
  }
}

function handleClose(trigger: TooltipTrigger) {
  if (props.trigger === trigger) {
    visible.value = false
  }
}

function handleClick() {
  if (!props.disabled && props.trigger === 'click') {
    visible.value = !visible.value
  }
}
</script>

