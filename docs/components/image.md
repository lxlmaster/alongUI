# Image 图片

Image 用于展示业务图片，支持懒加载、占位和预览等常见能力。

## 基础用法

```vue
<template>
  <al-image src="/images/cover.png" alt="封面图" />
</template>
```

## 常见状态

```vue
<template>
  <al-image
    src="/images/avatar.png"
    fit="cover"
    :preview-src-list="['/images/avatar.png']"
    lazy
  />
</template>
```

## API 简表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | `''` | 图片地址 |
| alt | `string` | `''` | 原生替代文本 |
| fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` | 填充方式 |
| previewSrcList | `string[]` | `[]` | 预览图片列表 |
| lazy | `boolean` | `false` | 是否懒加载 |
| fallback | `string` | `undefined` | 加载失败占位图 |

## 最小示例

```vue
<template>
  <al-image
    src="/images/demo.png"
    alt="示例图片"
    fit="cover"
  />
</template>
```
