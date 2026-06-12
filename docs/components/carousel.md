# Carousel 走马灯

Carousel 用于轮播一组内容，适合横幅推荐、版本更新和媒体预览。

## 基础用法

```vue
<template>
  <al-carousel height="240px">
    <al-carousel-item>1</al-carousel-item>
    <al-carousel-item>2</al-carousel-item>
  </al-carousel>
</template>
```

## 常见状态

```vue
<template>
  <al-carousel
    height="240px"
    autoplay
    indicator-position="outside"
    arrow="always"
  />
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| height | `string` | `'200px'` | 轮播区域高度 |
| autoplay | `boolean` | `true` | 是否自动播放 |
| interval | `number` | `3000` | 自动播放间隔 |
| arrow | `'always' \| 'hover' \| 'never'` | `'hover'` | 箭头显示时机 |
| indicatorPosition | `'inside' \| 'outside' \| 'none'` | `'inside'` | 指示器位置 |
| loop | `boolean` | `true` | 是否循环播放 |

## 最小示例

```vue
<template>
  <al-carousel height="220px">
    <al-carousel-item>Release Note</al-carousel-item>
    <al-carousel-item>Design Token</al-carousel-item>
  </al-carousel>
</template>
```
