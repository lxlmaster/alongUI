# Video 视频

Video 用于业务视频播放，适合产品演示、培训素材和内容预览。

## 基础用法

```vue
<template>
  <al-video src="/videos/demo.mp4" poster="/images/poster.png" />
</template>
```

## 常见状态

```vue
<template>
  <al-video
    src="/videos/demo.mp4"
    controls
    loop
    muted
    autoplay
  />
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | `''` | 视频地址 |
| poster | `string` | `undefined` | 封面图 |
| controls | `boolean` | `true` | 是否显示控制条 |
| autoplay | `boolean` | `false` | 是否自动播放 |
| loop | `boolean` | `false` | 是否循环播放 |
| muted | `boolean` | `false` | 是否静音 |
| playsinline | `boolean` | `true` | 是否行内播放 |

## 最小示例

```vue
<template>
  <al-video
    src="/videos/intro.mp4"
    poster="/images/intro-poster.png"
    controls
  />
</template>
```
