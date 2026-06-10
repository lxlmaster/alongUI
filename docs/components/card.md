# Card 卡片

Card 用于将相关信息组织在容器内，是页面内容分块的常用方式。

## 基础用法

```vue
<template>
  <al-card title="基础信息">
    <p>卡片内容</p>
  </al-card>
</template>
```

## 阴影与简单卡片

```vue
<template>
  <al-card shadow="always">始终显示阴影</al-card>
  <al-card shadow="hover">悬停显示阴影</al-card>
  <al-card shadow="never">无阴影</al-card>
</template>
```

## Card Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `undefined` | 卡片标题 |
| shadow | `'always' \| 'hover' \| 'never'` | `'always'` | 阴影显示策略 |
| padding | `string \| number` | `'16px'` | 卡片内边距 |
| border | `boolean` | `true` | 是否显示边框 |

## Card Slots

| 插槽名 | 说明 |
|--------|------|
| default | 卡片主体内容 |
| header | 自定义头部区域，优先级高于 `title` prop |
| footer | 卡片底部区域 |

## 设计说明

- 卡片使用 `--al-bg-color` 背景色与 `--al-border-color` 边框色，视觉上融入页面。
- 阴影默认为始终显示，提供轻度（`always`）、中度（`hover`）、无影（`never`）三级。
- 不内置操作按钮，若有需要由开发者通过 `footer` 插槽自行组织。
