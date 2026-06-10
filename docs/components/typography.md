# Typography 排版

Typography 提供 `AlText` 和 `AlTitle` 两个组件，用于统一页面中的文字层级与语义化样式。

## 标题

```vue
<template>
  <al-title :level="1">一级标题</al-title>
  <al-title :level="2">二级标题</al-title>
  <al-title :level="3">三级标题</al-title>
  <al-title :level="4">四级标题</al-title>
</template>
```

## 文本

```vue
<template>
  <al-text>默认文本</al-text>
  <al-text type="secondary">次要文本</al-text>
  <al-text type="disabled">禁用文本</al-text>
  <al-text truncated>这是一段很长很长的文本，当容器宽度不足时会被截断并显示省略号。</al-text>
</template>
```

## AlTitle Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| level | `number` | `1` | 标题层级，取值范围 `1 \| 2 \| 3 \| 4`，对应 `h1` ~ `h4` |

## AlText Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'primary' \| 'secondary' \| 'disabled'` | `'primary'` | 文本语义类型 |
| truncated | `boolean` | `false` | 是否单行截断（超出隐藏 + 省略号） |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 标题 / 文本内容 |

## 设计说明

- Title 根据 `level` 渲染为对应原生标签（`h1` ~ `h4`），不额外注入字号——字号由全局 CSS 层定义，方便主题定制。
- Text 提供三种语义色：`primary`（正文黑）、`secondary`（说明灰）、`disabled`（禁用浅灰）。
- `truncated` 通过 CSS 实现单行截断，避免 JavaScript 计算。
