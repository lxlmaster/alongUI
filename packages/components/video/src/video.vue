<template>
  <div class="al-video">
    <video
      ref="videoRef"
      class="al-video__player"
      :src="src"
      :poster="poster"
      :autoplay="autoplay"
      :controls="controls"
      :loop="loop"
      :muted="muted"
      :style="videoStyle"
      @play="emit('play')"
      @pause="emit('pause')"
      @ended="emit('ended')"
      @error="emit('error', $event)"
    >您的浏览器不支持视频播放</video>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { videoProps, videoEmits } from './video'
import { addUnit } from '@along-ui/utils'

defineOptions({ name: 'AlVideo' })

const props = defineProps(videoProps)
const emit = defineEmits(videoEmits)
const videoRef = ref<HTMLVideoElement>()

const videoStyle = computed(() => ({
  width: props.width ? addUnit(props.width) : '100%',
  height: props.height ? addUnit(props.height) : 'auto',
}))

defineExpose({ videoRef })
</script>
