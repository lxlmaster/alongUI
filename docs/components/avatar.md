# Avatar 头像

Avatar 用于展示用户或实体的头像图片，支持图片、文字和图标三种占位模式。

## 基础用法

```vue
<template>
  <al-avatar src="https://example.com/avatar.jpg" />
  <al-avatar>U</al-avatar>
  <al-avatar icon="UserIcon" />
</template>
```

## 尺寸与形状

```vue
<template>
  <al-avatar size="small">S</al-avatar>
  <al-avatar>M</al-avatar>
  <al-avatar size="large">L</al-avatar>
  <al-avatar shape="square">SQ</al-avatar>
</template>
```

## Avatar Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | `undefined` | 图片地址 |
| alt | `string` | `undefined` | 图片替代文本 |
| size | `'small' \| 'default' \| 'large' \| number` | `'default'` | 尺寸 |
| shape | `'circle' \| 'square'` | `'circle'` | 形状 |
| icon | `Component` | `undefined` | 图标组件，图片加载失败时显示 |
| fallback | `string` | `undefined` | 图片加载失败时的文字降级 |

## Avatar Slots

| 插槽名 | 说明 |
|--------|------|
| default | 文字内容，优先级低于图片，高于 `fallback` |

## 设计说明

- 头像尺寸统一为三级：small 32px、default 40px、large 48px，也可传入精确像素值。
- 默认圆形裁切，`square` 形状圆角为 6px。
- 图片加载失败时依次降级：`icon` -> `fallback` -> 首字母文字，确保始终有内容占位。
